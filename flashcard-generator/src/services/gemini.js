export async function generateFlashcards(pastedText) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const responseSchema = {
        type: "array",

        items: {
            type: "object",
            properties: {
                question: {type: "string"},
                answer: {type: "string"}
            },
            required: ["question", "answer"]
        } //this is the schema that gemini will reply back in, it will be type: array of type: objects where each object must contain a question field (text) and an answer field (text), and both are required — not optional. 

    }

    const promptText = `Generate flashcards from the following text. Create one flashcard per distinct concept or fact. Keep questions clear and answers concise.
    
    Text:${pastedText}`
    

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST", //we send data to gemini, it replies back, we arent just requesting a page with GET
        headers: {
            "Content-Type": "application/json", //tells gemini that we are sending it json and to parse it a such
            "x-goog-api-key": apiKey, //shows API key to show that we are alllowed to make this request
            "Api-Revision": "2026-05-20" //tells gemini which version of the response format to send back
        },
        body: JSON.stringify({
            model: "gemini-2.5-flash",
            input: promptText,
            responseFormat: {
                type: "text",
                mime_type: "application/json",
                schema: responseSchema
            }
        })
    })

    const data = await response.json()
    const outputStep = data.steps.find((step) => step.type === "model_output")

    const rawText = outputStep.content[0].text 
    const cards = JSON.parse(rawText)

}