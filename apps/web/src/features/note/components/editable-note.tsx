import { useRef, useEffect, useState, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import { useLiveQuery } from "dexie-react-hooks";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import { Toaster } from "@/components/ui/sonner";
import { db } from "@/lib/db";
import { streamLLMResponse } from "@/lib/ai/stream";

import NoteActions from "./note-actions";
import { mdComponents } from "./md-components";

export default function EditableNote({ noteId }: { noteId: string }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<(() => void) | null>(null);

  const [content, setContent] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  useLiveQuery(async () => {
    try {
      const note = await db.notes.get(noteId);
      if (note && note.content) {
        setContent(note.content);
      } else {
        setContent("Start typing...");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch note content");
    }
  }, [noteId]); //Use live query observer to fetch current content

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      console.log("save on escape");
      e.preventDefault();
      setIsEditing(false);

      try {
        await db.notes.update(noteId, { content });
      } catch (error) {
        console.error(error);
        toast.error("Failed to save note");
      }
    }
  }; //handle ESC key from textarea

  const handleDocumentKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.target === document.body) {
      if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        setIsEditing(true);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsEditing(false);
      }
    }
  }; //handle keys globally

  const handleGenerateAI = () => {
    if (isGenerating) {
      abortRef.current?.();
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    setContent("Generating...");

    const prompt = `Expand on this: ${content} keep it relevant and concise.`;

    abortRef.current = streamLLMResponse(
      prompt,
      (chunk) => {
        setContent((prev) => (prev === "Generating..." ? chunk : prev + chunk));
      },
      () => {
        setIsGenerating(false);
        db.notes.update(noteId, { content });
        toast.success("AI generation complete");
      },
    );
  };

  useEffect(() => {
    const textArea = textAreaRef.current;
    const adjustHeight = () => {
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    };

    textArea?.addEventListener("input", adjustHeight);
    adjustHeight();

    return () => {
      textArea?.removeEventListener("input", adjustHeight);
    };
  }, [isEditing]);

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
      abortRef.current?.();
    };
  }, []);

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isEditing]); //Focus on textarea when editing

  return (
    <div className="w-full h-full">
      <NoteActions onGenerateAI={handleGenerateAI}>
        <div className="relative w-full">
          <div className="absolute top-0 right-0 text-xs rounded-bl-md z-10">
            {isGenerating
              ? "---GENERATING---"
              : isEditing
                ? "---INSERT MODE---"
                : "---PREVIEW MODE---"}
          </div>
          {isEditing && !isGenerating ? (
            <textarea
              ref={textAreaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-96 text-base focus:outline-none focus:border-transparent resize-none overflow-hidden break-words"
              onKeyDown={handleKeyDown}
              onBlur={async () => {
                console.log("save on blur");
                setIsEditing(false);
                await db.notes.update(noteId, { content });
              }}
            />
          ) : (
            <div className="prose prose-sm w-full break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={mdComponents}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </NoteActions>
      <Toaster />
    </div>
  );
}
