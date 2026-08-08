import { useState } from 'react'
import PasteInput from './components/PasteInput'
import FlashcardViewer from './components/FlashcardViewer'
import { sampleCards } from './data/sampleCards'

function App(){

  const [ screen, setScreen ] = useState("input");
  const [ cards, setCards ] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(0);

  const handleGenerate = (pastedText) => {
    setCards(sampleCards);
    setScreen("cards");
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(nextIndex);
  }

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(prevIndex);
  }




  return (
    <div>
      {(screen === 'input') && <PasteInput onGenerate={handleGenerate} />}
      {(screen === 'cards') && <FlashcardViewer
                                    cards={cards}
                                    currentIndex={currentIndex}
                                    onNext={handleNext}
                                    onPrev={handlePrev}
      />}
    </div>
  )
}

export default App