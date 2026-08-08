import Flashcard from "./Flashcard";

function FlashcardViewer( {cards, currentIndex, onNext, onPrev} ){
    const currentCard = cards[currentIndex];


    return (
        <div>
            <Flashcard card={currentCard} />
            <button onClick={onPrev}>Previous</button>
            <button onClick={onNext}>Next</button>
        </div>
    )
}

export default FlashcardViewer