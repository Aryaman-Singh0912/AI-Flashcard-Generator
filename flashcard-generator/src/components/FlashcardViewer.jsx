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
    <div className="flex flex-col items-center gap-4">
      <p className="text-mauve text-sm font-medium">Card {currentIndex+1} of {cards.length}</p>
      <Flashcard card={currentCard} key={currentIndex}/>

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="bg-charcoal text-blush font-semibold py-2 px-6 rounded-lg hover:bg-ink transition"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="bg-charcoal text-blush font-semibold py-2 px-6 rounded-lg hover:bg-ink transition"
        >
          Next
        </button>
      </div>

      <div className="flex gap-4">
        <button
          disabled={isRegenerating}
          onClick={() => {
            onRegenerate("harder");
          }}
          className="bg-mauve text-blush font-semibold py-2 px-6 rounded-lg hover:bg-wine transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Harder
        </button>

        <button
          disabled={isRegenerating}
          onClick={() => {
            onRegenerate("simpler");
          }}
          className="bg-mauve text-blush font-semibold py-2 px-6 rounded-lg hover:bg-wine transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Simpler
        </button>
      </div>
    </div>
  );
}

export default FlashcardViewer;
