import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { streamLLMResponse } from '@/lib/ai/stream';

type AbortFunction = () => void;
type ProgressCallback = (generatedText: string) => void;
type CompletionCallback = (finalText: string) => void;

export function useAI() {
	const [isGenerating, setIsGenerating] = useState<boolean>(false);
	const abortRef = useRef<AbortFunction | null>(null);

	const generateContent = (
		originalContent: string,
		onProgress: ProgressCallback,
		onComplete: CompletionCallback
	) => {
		if (isGenerating) {
			abortRef.current?.();
			setIsGenerating(false);
			return;
		}

		setIsGenerating(true);
		const prompt = `Expand on this: ${originalContent}. Keep it relevant, concise, 
      and avoid adding labels like "answer" or extra formatting. 
      Provide the expanded content directly.`;
		let generatedText = '';

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
					toast.success('AI generation complete');
				}
			) || null;
	};

	return {
		isGenerating,
		generateContent,
	};
}
