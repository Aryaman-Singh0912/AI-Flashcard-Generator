import { useState } from "react";

function PasteInput({ onGenerate, isLoading, error }) {
  const [text, setText] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <div>
        {error && <p>{error}</p>}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button onClick={() => onGenerate(text)} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Flashcards"}
        </button>
        
      </div>
    </div>
  );
}

export default PasteInput;
