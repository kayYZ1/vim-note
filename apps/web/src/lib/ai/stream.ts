export const streamLLMResponse = (
	prompt: string,
	onChunk: (chunk: string) => void,
	onComplete?: () => void
) => {
	const API_KEY = process.env.OPEN_ROUTER; //Temporary key
	const MODEL_ID = 'google/gemini-2.0-pro-exp-02-05:free'; // Free model on OpenRouter

	// Create an AbortController to allow cancellation
	const abortController = new AbortController();

	// Start the streaming process
	(async () => {
		try {
			const response = await fetch(
				'https://openrouter.ai/api/v1/chat/completions',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${API_KEY}`,
						'HTTP-Referer': window.location.origin, // Required by OpenRouter
						'X-Title': 'LLM Streaming', // Optional but recommended
					},
					body: JSON.stringify({
						model: MODEL_ID,
						messages: [{ role: 'user', content: prompt }],
						stream: true, // Enable streaming
					}),
					signal: abortController.signal,
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			if (!response.body) {
				throw new Error('Response body is null');
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value);
				const lines = chunk.split('\n').filter((line) => line.trim() !== '');

				for (const line of lines) {
					if (line.startsWith('data: ')) {
						const data = line.slice(6);

						if (data === '[DONE]') continue;

						try {
							const parsed = JSON.parse(data);
							const content = parsed.choices[0]?.delta?.content || '';
							if (content) {
								onChunk(content);
							}
						} catch (e) {
							console.error('Error parsing JSON from stream:', e);
						}
					}
				}
			}

			onComplete?.();
		} catch (error) {
			console.error('Error generating response:', error);
		}
	})();

	return () => abortController.abort();
};

// Example usage:
// const abort = streamLLMResponse(
//   "Explain quantum computing briefly",
//   (chunk) => {
//     console.log("Received chunk:", chunk);
//     // Update your UI here with the new chunk
//   },
//   () => console.log("Streaming complete"),
//   (error) => console.error("Error:", error)
// );
//
// To stop streaming early:
// abort();
