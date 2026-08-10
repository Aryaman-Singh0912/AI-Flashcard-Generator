import { useState } from "react";
import PasteInput from "./components/PasteInput";
import FlashcardViewer from "./components/FlashcardViewer";
import { generateFlashcardsFromGemini } from "./services/gemini";
import { regenerateCardFromGemini } from "./services/gemini";

function App() {
  const [screen, setScreen] = useState("input");
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originalText, setOriginalText] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleGenerate = async (pastedText) => {
    setIsLoading(true);
    setError(null);
    setOriginalText(pastedText);
    try {
      const generatedCards = await generateFlashcardsFromGemini(pastedText);
      setCards(generatedCards);
      setCurrentIndex(0);
      setScreen("cards");
    } catch (err) {
      setError("Something went wrong generating flashcards, try again...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (difficulty) => {
    setIsRegenerating(true);
    try {
      const newCard = await regenerateCardFromGemini(
        originalText,
        cards[currentIndex],
        difficulty,
      );
      const updatedCards = cards.map((card, arrIndex) => {
        if (arrIndex == currentIndex) {
          return newCard;
        } else {
          return card;
        }
      });
      setCards(updatedCards);
    } catch (err) {
      setError(
        "Something went wrong increasing/decreasing difficulty, try again...",
      );
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="min-h-screen bg-blush flex flex-col items-center py-12 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-wine">Flashcard Generator</h1>
        <p className="text-mauve mt-1">By Aryaman Singh</p>
      </div>

      {screen === "input" && (
        <PasteInput
          onGenerate={handleGenerate}
          isLoading={isLoading}
          error={error}
        />
      )}
      {screen === "cards" && (
        <FlashcardViewer
          cards={cards}
          currentIndex={currentIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onRegenerate={handleRegenerate}
          isRegenerating={isRegenerating}
        />
      )}
    </div>
  );
}

export default App;
