import { useState } from "react";

function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="bg-plum text-blush rounded-2xl p-10 min-h-[200px] flex items-center justify-center text-center cursor-pointer hover:bg-wine transition"
    >
      {isFlipped ? (
        <div className="flex flex-col gap-4">
          <div className="text-sm opacity-80">
            <span className="font-bold">Question:</span> {card.question}
          </div>
          <div className="text-lg">
            <span className="font-bold block mb-2">Answer:</span>
            <span>{card.answer}</span>
          </div>
        </div>
      ) : (
        <div className="text-lg">
          <span className="font-bold block mb-2">Question:</span>
          <span>{card.question}</span>
        </div>
      )}
    </div>
  );
}

export default Flashcard;
