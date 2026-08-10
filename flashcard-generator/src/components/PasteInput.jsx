import { useState, useRef } from "react";

function PasteInput({ onGenerate, isLoading, error }) {
  const [text, setText] = useState("");
  const [numCards, setNumCards] = useState(10);
  const textareaRef = useRef(null);

  const parsedCount = Number(numCards);
  const isValidCount =
    numCards != "" &&
    Number.isInteger(parsedCount) &&
    parsedCount > 0 &&
    parsedCount <= 30;

  const adjustHeight = () => {
    textareaRef.current.style.height = "auto";
    const newHeight = Math.min(textareaRef.current.scrollHeight, 400);
    textareaRef.current.style.height = newHeight + "px";
  };

  return (
    <div className="bg-charcoal rounded-2xl shadow-lg p-8 max-w-xl w-full">
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="numCards" className="text-sm text-blush">
          Number of cards (1-30)
        </label>
        <input
          id="numCards"
          type="number"
          min={1}
          max={30}
          value={numCards}
          onChange={(e) => setNumCards(e.target.value)}
          className="w-20 bg-plum border border-mauve rounded-lg p-2 text-center text-blush focus:outline-none focus:ring-2 focus:ring-blush appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          adjustHeight();
        }}
        className="w-full bg-plum border border-mauve rounded-lg p-4 text-base text-blush placeholder-mauve resize-none max-h-[400px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blush [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-plum [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-mauve [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-wine"
        placeholder="Paste your notes here..."
      ></textarea>

      <button
        onClick={() => onGenerate(text, numCards)}
        disabled={isLoading || !isValidCount}
        className="mt-4 bg-wine hover:bg-ink text-blush font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Generating..." : "Generate Flashcards"}
      </button>
    </div>
  );
}

export default PasteInput;
