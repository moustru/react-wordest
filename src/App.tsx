import { useEffect, useState } from "react";
import "./App.css";
import type { LetterType } from "./types/Word";
import AnswerBlock from "./components/AnswerBlock/AnswerBlock";
import QuestionBlock from "./components/QuestionBlock/QuestionBlock";
import MistakesBlock from "./components/MistakesBlock/MistakesBlock";

import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  addLetterToAnswer,
  resetAnswerState,
} from "./store/slices/answerSlice";

import {
  checkEndOfWord,
  guessLetter,
  letterErrorKeydown,
  nextWord,
  selectCurrentWordObject,
} from "./store/slices/wordsSlice";
import { TRIGGERED_KEY_CODES } from "./helpers/constants";
import LettersBlock from "./components/LettersBlock/LettersBlock";
import { setTrainerBlockState } from "./store/slices/trainerSlice";

function App() {
  const dispatch = useAppDispatch();

  const [lettersBlockClass, setLettersBlockClass] = useState<string>(
    "letters__block--default"
  );

  const currentWord = useAppSelector((state) =>
    selectCurrentWordObject(state.wordsState)
  );

  const trainerBlockState = useAppSelector((state) => state);

  // Answer dispatches
  const addToAnswer = (letter: LetterType) =>
    dispatch(addLetterToAnswer(letter));

  const resetAnswerStateAction = () => dispatch(resetAnswerState());

  // Words dispatches
  const guessLetterAction = (selectedLetter: LetterType) =>
    dispatch(guessLetter(selectedLetter));

  const nextWordAction = () => dispatch(nextWord());

  const letterErrorKeydownAction = () => dispatch(letterErrorKeydown());

  const checkEndOfWordEvent = () =>
    dispatch(
      checkEndOfWord({
        right: () =>
          setTimeout(() => {
            setTrainerBlockStateAction(false);
          }, 1000),
        left: () =>
          setTimeout(() => {
            nextWordAction();
            resetAnswerStateAction();
          }, 1000),
      })
    );

  // Trainer dispatches
  const setTrainerBlockStateAction = (state: boolean) =>
    dispatch(setTrainerBlockState(state));

  function handleErrorKeydown() {
    letterErrorKeydownAction();

    setLettersBlockClass("letters__block--error");

    setTimeout(() => setLettersBlockClass("letters__block--default"), 200);
  }

  function handleKeydownEvent(e: KeyboardEvent) {
    const [from, to] = TRIGGERED_KEY_CODES;
    const currentLetter = currentWord.literal.charAt(currentWord.currentLetter);

    const relatedLetter = currentWord.shuffled.find(
      (letter) => letter.literal === e.key
    );

    if (e.keyCode >= from && e.keyCode <= to) {
      if (relatedLetter?.literal === currentLetter) {
        guessLetterAction(relatedLetter);
        addToAnswer(relatedLetter);
      } else {
        handleErrorKeydown();
      }
    }

    checkEndOfWordEvent();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeydownEvent);

    return () => window.removeEventListener("keydown", handleKeydownEvent);
  });

  return (
    <div className="main">
      {trainerBlockState ? (
        <>
          <h1>English Vocabulary Trainer</h1>
          <QuestionBlock />
          <div className="main-content">
            <AnswerBlock />
            <LettersBlock lettersBlockClass={lettersBlockClass} />
            <MistakesBlock />
          </div>
        </>
      ) : (
        <div>Конец!</div>
      )}
    </div>
  );
}

export default App;
