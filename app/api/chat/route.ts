export async function POST(req: Request) {
  try {
    const { messages, webSearchEnabled = false } = await req.json()

    const lastUserMessage = messages[messages.length - 1]?.content || ""

    if (!lastUserMessage.trim()) {
      return new Response(JSON.stringify({ response: "Please provide a message to continue." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (webSearchEnabled) {
      // Use the streaming endpoint for web search
      try {
        const response = await fetch("http://localhost:8000/query/stream", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "text/event-stream",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ question: lastUserMessage }),
        })

        if (!response.ok) {
          throw new Error(`External API error: ${response.status}`)
        }

        // For the API route, we'll return the initial response and let the frontend handle streaming
        return new Response(JSON.stringify({ 
          response: "Web search initiated. Please check the chat interface for real-time updates.",
          webSearch: true 
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      } catch (error) {
        console.error("Error calling external streaming API:", error)
        return new Response(JSON.stringify({ 
          response: "Sorry, the web search service is currently unavailable. Please try again later." 
        }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        })
      }
    } else {
      // Use the quick endpoint for basic queries
      try {
        const response = await fetch("http://localhost:8000/quick", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: lastUserMessage }),
        })

        if (!response.ok) {
          throw new Error(`External API error: ${response.status}`)
        }

        const data = await response.json()
        
        // Return the response directly since /quick returns JSON with a response field
        return new Response(JSON.stringify({ response: data.response }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      } catch (error) {
        console.error("Error calling external API:", error)
        
        // Fallback to basic responses if external API fails
        let aiResponse = "I'm here to help you with your career journey. Please ask me anything!"
        
        if (lastUserMessage.toLowerCase().includes("hello")) {
          aiResponse = "Hi there! What can I do for you?"
        } else if (lastUserMessage.toLowerCase().includes("career")) {
          aiResponse = "I can help you with career advice, job searching, and interview preparation. What specifically are you looking for?"
        } else if (lastUserMessage.toLowerCase().includes("job")) {
          aiResponse = "Are you looking for job search tips, resume help, or something else related to jobs?"
        } else if (lastUserMessage.toLowerCase().includes("interview")) {
          aiResponse = "I can help you prepare for interviews with common questions, tips, and mock scenarios. What kind of interview are you preparing for?"
        } else if (lastUserMessage.toLowerCase().includes("thank you") || lastUserMessage.toLowerCase().includes("thanks")) {
          aiResponse = "You're welcome! Is there anything else I can assist you with?"
        } else if (lastUserMessage.toLowerCase().includes("bye") || lastUserMessage.toLowerCase().includes("goodbye")) {
          aiResponse = "Goodbye! Have a great day!"
        }

        return new Response(JSON.stringify({ response: aiResponse }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }
    }
  } catch (error) {
    console.error("Error in chat API route:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
