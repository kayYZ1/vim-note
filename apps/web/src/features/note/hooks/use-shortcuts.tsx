import { useEffect, RefObject, KeyboardEvent } from "react";

interface NoteKeyboardShortcutsProps {
  onEscape: () => void;
  onInsertMode: () => void;
  isEditing: boolean;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export function useShortcuts({
  onEscape,
  onInsertMode,
  isEditing,
  textAreaRef,
}: NoteKeyboardShortcutsProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onEscape();
    }
  };

  useEffect(() => {
    const handleDocumentKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.target === document.body) {
        if (e.key === "i" || e.key === "I") {
          e.preventDefault();
          onInsertMode();
        } else if (e.key === "Escape") {
          e.preventDefault();
          onEscape();
        }
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [onEscape, onInsertMode, textAreaRef]);

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      const textarea = textAreaRef.current;
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd - textarea.value.length;
    }
  }, [isEditing, textAreaRef]);

  return { handleKeyDown };
}
