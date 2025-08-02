export async function POST(req: Request) {
  const { prompt } = await req.json()

  // Simulate AI response with crisp and detailed content + links
  const crispContent = `Here's a crisp summary of "${prompt}". HeadStarter helps you break into top AI/ML roles by solving real-world problems and getting personalized referrals.`
  const detailedContent = `This is the detailed information for your query about "${prompt}". HeadStarter's program focuses on practical projects (20-100hr coding projects in full-stack, AI/ML, or infra) given by startups. You'll gain a career score, get personalized referrals to jobs, and receive support throughout your journey. We partner with over 30 companies hiring for 100+ roles. Our platform also offers AI mock interviews and feedback on communication, plus IRL events and resume roasts.`
  const links = [
    { text: "About HeadStarter", url: "https://www.headstarter.com/about" },
    { text: "Program Details", url: "https://www.headstarter.com/program" },
    { text: "Success Stories", url: "https://www.headstarter.com/success" },
  ]

  // In a real application, you would use an AI model here:
  // const result = await streamText({
  //   model: openai("gpt-4o"),
  //   prompt: prompt,
  //   // You might need to use tool calls or function calling to get structured data
  //   // for crispContent, detailedContent, and links from the AI model.
  // });
  // const aiResponse = await result.text; // Or process chunks

  return new Response(JSON.stringify({ crispContent, detailedContent, links }), {
    headers: { "Content-Type": "application/json" },
  })
}
