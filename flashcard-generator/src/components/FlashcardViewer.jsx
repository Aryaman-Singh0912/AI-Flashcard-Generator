import Flashcard from "./Flashcard";

function FlashcardViewer({
  cards,
  currentIndex,
  onNext,
  onPrev,
  onRegenerate,
  isRegenerating,
}) {
  const currentCard = cards[currentIndex];

  return (
    <div>
      <Flashcard card={currentCard} />
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
      <button
        disabled={isRegenerating}
        onClick={() => {
          onRegenerate("harder");
        }}
      >
        Harder
      </button>

      <button
        disabled={isRegenerating}
        onClick={() => {
          onRegenerate("simpler");
        }}
      >
        Simpler
      </button>
    </div>
  );
}

export default FlashcardViewer;
