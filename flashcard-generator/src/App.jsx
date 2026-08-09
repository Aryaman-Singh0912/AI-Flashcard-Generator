import { useState } from 'react'
import PasteInput from './components/PasteInput'
import FlashcardViewer from './components/FlashcardViewer'
import { generateFlashcards } from './services/gemini';

function App(){

  const [ screen, setScreen ] = useState("input");
  const [ cards, setCards ] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);


  const handleGenerate = async(pastedText) => {
    setIsLoading(true);
    setError(null);
    try{
      const generatedCards = await generateFlashcards(pastedText);
      setCards(generatedCards);
      setCurrentIndex(0);
      setScreen("cards");
    }
    catch (err){
      setError("Something went wrong generating flashcards, try again...");
    }
    finally{
      setIsLoading(false);
    }
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
      {(screen === 'input') && <PasteInput 
                                  onGenerate={handleGenerate}
                                  isLoading={isLoading}
                                  error={error}
      />}
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