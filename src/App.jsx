import { useState } from 'react'
import Flashcard from './components/Flashcard'
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import questionBankData from "./assets/questionBank.json"
import './App.css'

function App() {

  const deckSize = questionBankData.length

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isQuestion, setIsQuestion] = useState(true)
  const [guess, setGuess] = useState("")
  const [guessStatus, setGuessStatus] = useState(null)

  const onNext = () => {
    if (currentIndex < 50) {
      setCurrentIndex(currentIndex+1)
    }
    setIsQuestion(true)
    setGuess("")
    setGuessStatus(null)
  }

  const onPrev = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex-1)
    }
    setGuess("")
    setGuessStatus(null)
  }

  const flipCard = () => {
      setIsQuestion(prev => !prev)
  }

  const submitGuess = (event) => {
    event.preventDefault()
    setGuessStatus(guess === questionBankData[currentIndex].answer ? "correct" : "incorrect")
  }

  const onGuessChange = (event) => {
    setGuess(event.target.value)
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Geography Flashcards!</h1>
        <h3>Do you know your geography? Test ur skills here!</h3>
        <p>Number of cards: {deckSize}</p>
      </div>
      <Flashcard card={questionBankData[currentIndex]} flipFunction={flipCard} isQuestion={isQuestion}/>
      <form className="guess-container" onSubmit={submitGuess}>
        <label htmlFor="guess-input">Guess the answer here:</label>
        <input
          id="guess-input"
          value={guess}
          onChange={onGuessChange}
          placeholder="Type your guess"
          className={guessStatus === "correct" ? "guess-correct" : guessStatus === "incorrect" ? "guess-incorrect" : ""}
        />
        <button type="submit">Submit Guess</button>
      </form>
      <div className="button-container">
        <button onClick={onPrev} disabled={currentIndex === 0}>
          <HiArrowLeft size={30}/>
        </button>
        <button onClick={onNext} disabled={currentIndex === 49}>
          <HiArrowRight size={30}/>
        </button>
      </div>
    </div>
  )
}

export default App
