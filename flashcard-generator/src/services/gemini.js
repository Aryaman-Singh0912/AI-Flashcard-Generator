export async function generateFlashcardsFromGemini(pastedText, numCards) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const responseSchema = {
        type: "array",
        items: {
            type: "object",
            properties: {
                question: { type: "string" },
                answer: { type: "string" }
            },
            required: ["question", "answer"]
        }
    }

    const promptText = `Generate ${numCards} flashcard(s) from the following text. Create one flashcard per distinct concept or fact. Keep questions clear and answers concise.
    Text:${pastedText}`

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
            contents: [
                { parts: [ { text: promptText } ] }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        })
    })

    const data = await response.json()
    const rawText = data.candidates[0].content.parts[0].text
    const cards = JSON.parse(rawText)
    return cards;
}

export async function regenerateCardFromGemini(originalText, originalCard, difficulty){
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const responseSchema = {
        type: "object",
        properties: {
            question : {type : "string"},
            answer: {type: "string"}
        },
        required: ["question", "answer"]
    }

    const promptText = `Make the flashcard with the question ${originalCard.question} and answer ${originalCard.answer} ${difficulty} still grounded with the original text: ${originalText}`

        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
            contents: [
                { parts: [ { text: promptText } ] }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        })
    })

    const data = await response.json()
    const rawText = data.candidates[0].content.parts[0].text
    const updatedCard = JSON.parse(rawText)
    return updatedCard;
    
}