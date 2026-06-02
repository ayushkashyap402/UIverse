const FREE_MODELS = [
  "openrouter/auto",
  "qwen/qwen3-coder:free",
  "deepseek/deepseek-v3:free",
  "meta-llama/llama-3.3-70b-instruct:free",
];

export async function generateComponent(prompt) {
  for (const model of FREE_MODELS) {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
          }),
        },
      );

      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (e) {
      continue;
    }
  }

  throw new Error("All models failed");
}
