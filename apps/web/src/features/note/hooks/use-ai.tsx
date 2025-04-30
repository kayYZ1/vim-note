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
    const prompt = `Base your response on ${originalContent} if the text is just a prompt telling you do this something, do it. If it's the content that is already written then simply expand on that topic with context that you have. Avoid adding unnecessary labels or anything just concise and straight to the point response. If you are not sure what to write, just write a short response.`;
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
