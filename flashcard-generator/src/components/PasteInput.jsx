import { useState } from "react";

function PasteInput({ onGenerate, isLoading, error }) {
  const [text, setText] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-blush">
      <div className="bg-charcoal rounded-2xl shadow-lg p-8 max-w-xl w-full">
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-plum border border-mauve rounded-lg p-4 text-base text-blush placeholder-mauve resize-none focus:outline-none focus:ring-2 focus:ring-blush"
        ></textarea>

        <button
          onClick={() => onGenerate(text)}
          disabled={isLoading}
          className="mt-4 bg-wine hover:bg-ink text-blush font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating..." : "Generate Flashcards"}
        </button>
      </div>
    </div>
  );
}

export default PasteInput;
