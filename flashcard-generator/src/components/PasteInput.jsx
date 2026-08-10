import { useState, useRef } from "react";

function PasteInput({ onGenerate, isLoading, error }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    textareaRef.current.style.height = "auto";
    const newHeight = Math.min(textareaRef.current.scrollHeight, 400);
    textareaRef.current.style.height = newHeight + "px";
  };

  return (
    <div className="bg-charcoal rounded-2xl shadow-lg p-8 max-w-xl w-full">
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          adjustHeight();
        }}
        className="w-full bg-plum border border-mauve rounded-lg p-4 text-base text-blush placeholder-mauve resize-none max-h-[400px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blush"
        placeholder="Paste your notes here..."
      ></textarea>

      <button
        onClick={() => onGenerate(text)}
        disabled={isLoading}
        className="mt-4 bg-wine hover:bg-ink text-blush font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Generating..." : "Generate Flashcards"}
      </button>
    </div>
  );
}

export default PasteInput;
