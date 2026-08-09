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
      <p className="text-lg font-medium">
        {isFlipped ? card.answer : card.question}
      </p>
    </div>
  );
}

export default Flashcard;
