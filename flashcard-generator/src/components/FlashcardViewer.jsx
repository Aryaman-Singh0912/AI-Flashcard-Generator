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
    <div className="flex flex-col items-center justify-center min-h-screen bg-blush gap-4">
      <Flashcard card={currentCard} />
      <div className="flex gap-4">
        <button
          className="bg-charcoal
          text-blush
          font-semibold
          py-2
          px-6
          rounded-lg
          hover:bg-ink
          transition"
          onClick={onPrev}
        >
          Previous
        </button>

        <button
          className="bg-charcoal
          text-blush
          font-semibold
          py-2
          px-6
          rounded-lg
          hover:bg-ink
          transition"
          onClick={onNext}
        >
          Next
        </button>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-mauve text-blush font-semibold py-2 px-6 rounded-lg hover:bg-wine transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRegenerating}
          onClick={() => {
            onRegenerate("harder");
          }}
        >
          Harder
        </button>

        <button
          className="bg-mauve text-blush font-semibold py-2 px-6 rounded-lg hover:bg-wine transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRegenerating}
          onClick={() => {
            onRegenerate("simpler");
          }}
        >
          Simpler
        </button>
      </div>
    </div>
  );
}

export default FlashcardViewer;
