import { useState } from "react"

function PasteInput({ onGenerate, isLoading, error }){

    const [ text, setText ] = useState("");

    return (
        <div>
            {(error) && <p>{error}</p>}

            <textarea value={text} onChange={(e) => setText(e.target.value)}>
            </textarea>

            <button onClick={() => onGenerate(text)} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Flashcards"}
            </button>
        </div>
    )
}

export default PasteInput