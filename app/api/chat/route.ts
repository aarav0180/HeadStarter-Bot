export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Simulate AI response for now
    const lastUserMessage = messages[messages.length - 1]?.content || ""
    let aiResponse = "Hello! How can I help you today?"

    if (lastUserMessage.toLowerCase().includes("hello")) {
      aiResponse = "Hi there! What can I do for you?"
    } else if (lastUserMessage.toLowerCase().includes("career")) {
      aiResponse =
        "I can help you with career advice, job searching, and interview preparation. What specifically are you looking for?"
    } else if (lastUserMessage.toLowerCase().includes("job")) {
      aiResponse = "Are you looking for job search tips, resume help, or something else related to jobs?"
    } else if (lastUserMessage.toLowerCase().includes("interview")) {
      aiResponse =
        "I can help you prepare for interviews with common questions, tips, and mock scenarios. What kind of interview are you preparing for?"
    } else if (
      lastUserMessage.toLowerCase().includes("thank you") ||
      lastUserMessage.toLowerCase().includes("thanks")
    ) {
      aiResponse = "You're welcome! Is there anything else I can assist you with?"
    } else if (lastUserMessage.toLowerCase().includes("bye") || lastUserMessage.toLowerCase().includes("goodbye")) {
      aiResponse = "Goodbye! Have a great day!"
    } else {
      aiResponse = "I'm still learning, but I'm here to assist you with your career journey. Please ask me anything!"
    }

    // In a real application, you would integrate with an actual AI model here.
    // Example using AI SDK (uncomment and configure with your API key):
    /*
    const { text } = await generateText({
      model: openai("gpt-4o"), // Or another model like xai("grok-3") or groq("llama3-8b-8192")
      prompt: lastUserMessage,
      messages: messages.map((msg: any) => ({ role: msg.role, content: msg.content })),
    });
    aiResponse = text;
    */

    return new Response(JSON.stringify({ response: aiResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
