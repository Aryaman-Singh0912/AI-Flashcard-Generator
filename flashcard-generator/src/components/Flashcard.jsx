import { useState } from 'react'

function Flashcard( {card} ){
    const [ isFlipped, setIsFlipped ] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }
    return (
        <div onClick={handleFlip}>
            <p>
                {isFlipped ? card.answer : card.question}
            </p>
        </div>
    )
}

export default Flashcard