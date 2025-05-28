import { useState, useRef } from "react";
import { toast } from "sonner";
import { streamLLMResponse } from "@/lib/ai/stream";

type AbortFunction = () => void;
type ProgressCallback = (generatedText: string) => void;
type CompletionCallback = (finalText: string) => void;

export function useAI() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const abortRef = useRef<AbortFunction | null>(null);

  const generateContent = (
    originalContent: string,
    onProgress: ProgressCallback,
    onComplete: CompletionCallback,
  ) => {
    if (isGenerating) {
      abortRef.current?.();
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    const prompt = `Given the input text: "${originalContent}", do the following:
    - If the text is a directive (i.e., a prompt telling you to do something), respond accordingly.
    - If the text is content or a topic, expand on it concisely using relevant context.
    - Do not include labels, headings, or framing; only output the response.
    - Do not repeat the original content.
    - Avoid filler words or generic statements.
    `;
    let generatedText = "";

    abortRef.current =
      streamLLMResponse(
        prompt,
        (chunk: string) => {
          generatedText += chunk;
          onProgress(generatedText);
        },
        () => {
          setIsGenerating(false);
          onComplete(generatedText);
          toast.success("AI generation complete");
        },
      ) || null;
  };

  return {
    isGenerating,
    generateContent,
  };
}
