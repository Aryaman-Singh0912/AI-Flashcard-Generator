import { useState } from "react"

function PasteInput({ onGenerate }){

    const [ text, setText ] = useState("");

    return (
        <div>
            <button onClick = {() => {
                        onGenerate(text);
                    }}>
                    Generate Flashcards
            </button>

            <textarea value={text} onChange = {(e) => 
                {setText(e.target.value)}}>
            </textarea>
            
        </div>
    )
}

export default PasteInput