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
		const prompt = `Expand on this: ${originalContent} keep it relevant and concise.`;
		let generatedText = '';

		abortRef.current = streamLLMResponse(
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
		);
	};

	const cancelGeneration = (): void => {
		if (isGenerating && abortRef.current) {
			abortRef.current();
			setIsGenerating(false);
		}
	};

	// Clean up on unmount
	const cleanup = (): void => {
		cancelGeneration();
	};

	return {
		isGenerating,
		generateContent,
		cancelGeneration,
		cleanup,
	};
}
