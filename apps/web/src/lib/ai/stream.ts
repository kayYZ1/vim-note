import { toast } from "sonner";

export const streamLLMResponse = (
  prompt: string,
  onChunk: (chunk: string) => void,
  onComplete?: () => void,
) => {
  const API_KEY = import.meta.env.VITE_OPEN_ROUTER;
  console.log("PROD API KEY TEST", API_KEY);
  const MODEL_ID = localStorage.getItem("model") || "None";

  if (MODEL_ID === "None") {
    toast.error("Please select a model in the settings page");
    return;
  }

  const abortController = new AbortController();

  (async () => {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "HTTP-Referer": window.location.origin, // Required by OpenRouter
            "X-Title": "LLM Streaming", // Optional but recommended
          },
          body: JSON.stringify({
            model: MODEL_ID,
            messages: [{ role: "user", content: prompt }],
            stream: true, // Enable streaming
          }),
          signal: abortController.signal,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || "";
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              console.error("Error parsing JSON from stream:", e);
            }
          }
        }
      }

      onComplete?.();
    } catch (error) {
      console.error("Error generating response:", error);
    }
  })();

  return () => abortController.abort();
};
