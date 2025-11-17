import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question, context } = await req.json();

  const prompt = `You are an expert assistant for a course. Answer the user's question based only on the following course content:\n${context}\n\nQuestion: ${question}\nAnswer:`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You answer only using the provided course content." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.2,
    }),
  });

  const data = await openaiRes.json();
  console.log("OpenAI API response:", JSON.stringify(data, null, 2));
  const answer = data.choices?.[0]?.message?.content?.trim() || "No answer found.";

  return NextResponse.json({ answer });
}
