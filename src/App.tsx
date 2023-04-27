import { useEffect, useState } from "react";
import "./App.css";
import Letter from "./components/Letter/Letter";
import { setWordsArray } from "./helpers/words";
import type { LetterType, WordObject } from "./types/Word";
import { TRIGGERED_KEY_CODES } from "./helpers/constants";
import AnswerBlock from "./components/AnswerBlock/AnswerBlock";
import QuestionBlock from "./components/QuestionBlock/QuestionBlock";
import MistakesBlock from "./components/MistakesBlock/MistakesBlock";

function App() {
  const randomWords = setWordsArray();

  const [currentWord, setCurrentWord] = useState<number>(0);

  const [word, setNewWordArray] = useState<WordObject>(
    randomWords[currentWord]
  );

  const [answer, setAnswerState] = useState<LetterType[]>([]);

  const [lettersBlockClass, setLettersBlockClass] = useState<string>(
    "letters__block--default"
  );

  const [trainerVisible, setTrainerVisibleState] = useState<boolean>(true);

  function letterNext(selectedLetter: LetterType) {
    setNewWordArray((wordState) => ({
      ...wordState,
      currentLetter: (wordState.currentLetter += 1),
      shuffled: wordState.shuffled.filter(
        (letter) => letter.id !== selectedLetter.id
      ),
    }));

    setAnswerState([...answer, selectedLetter]);
  }

  function letterErrorClick(selectedLetter: LetterType) {
    setNewWordArray((wordState) => ({
      ...wordState,
      mistakes: ++wordState.mistakes,
      shuffled: wordState.shuffled.map((letter) => {
        if (letter.id !== selectedLetter.id) return letter;
        else
          return {
            ...letter,
            bgClass: "letter--danger",
          };
      }),
    }));
  }

  function letterErrorKeydown() {
    setNewWordArray((wordState) => ({
      ...wordState,
      mistakes: ++wordState.mistakes,
    }));

    setLettersBlockClass("letters__block--error");

    setTimeout(() => setLettersBlockClass("letters__block--default"), 200);
  }

  function nextLetter(selectedLetter: LetterType) {
    const currentLetter = word.literal.charAt(word.currentLetter);

    if (currentLetter === selectedLetter.literal) {
      letterNext(selectedLetter);
    } else {
      letterErrorClick(selectedLetter);
    }

    handleEndOfWord();
  }

  function handleEndOfWord() {
    if (word.literal.length === word.currentLetter + 1) {
      if (currentWord === 5) {
        setTrainerVisibleState(false);
      } else {
        setTimeout(() => {
          setCurrentWord((currentWord) => (currentWord += 1));

          setAnswerState([]);

          setNewWordArray(randomWords[currentWord]);
        }, 500);
      }
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    const [from, to] = TRIGGERED_KEY_CODES;
    const currentLetter = word.literal.charAt(word.currentLetter);

    const relatedLetter = word.shuffled.find(
      (letter) => letter.literal === e.key
    );

    if (e.keyCode >= from && e.keyCode <= to) {
      if (relatedLetter?.literal === currentLetter) {
        letterNext(relatedLetter);
      } else {
        letterErrorKeydown();
      }
    }

    handleEndOfWord();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  });

  return (
    <div className="main">
      {trainerVisible ? (
        <>
          <h1>English Vocabulary Trainer</h1>
          <QuestionBlock currentWord={currentWord} />
          <div className="main-content">
            <AnswerBlock answer={answer} />
            <div className={`main-content__letters ${lettersBlockClass}`}>
              {word.shuffled.map((letter, i) => (
                <Letter
                  {...letter}
                  key={i}
                  letterClick={(l) => nextLetter(l)}
                />
              ))}
            </div>
            <MistakesBlock mistakesCount={word.mistakes} />
          </div>
        </>
      ) : (
        <div>Конец!</div>
      )}
    </div>
  );
}

export default App;
