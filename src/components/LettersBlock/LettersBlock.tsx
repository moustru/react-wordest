import "./LettersBlock.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Letter from "../Letter/Letter";
import type { LetterType } from "@/types/Word";
import {
  addLetterToAnswer,
  resetAnswerState,
} from "@/store/slices/answerSlice";
import {
  checkEndOfWord,
  guessLetter,
  letterErrorClick,
  nextWord,
  selectCurrentWordObject,
} from "@/store/slices/wordsSlice";
import { setTrainerBlockState } from "@/store/slices/trainerSlice";

interface LettersBlockProps {
  lettersBlockClass: string;
}

export default function LettersBlock(props: LettersBlockProps) {
  const { lettersBlockClass } = props;

  const dispatch = useAppDispatch();

  const currentWord = useAppSelector((state) =>
    selectCurrentWordObject(state.wordsState)
  );

  const addToAnswer = (letter: LetterType) =>
    dispatch(addLetterToAnswer(letter));

  const resetAnswerStateAction = () => dispatch(resetAnswerState());

  const guessLetterAction = (selectedLetter: LetterType) =>
    dispatch(guessLetter(selectedLetter));

  const nextWordAction = () => dispatch(nextWord());

  const letterErrorClickAction = (selectedLetter: LetterType) =>
    dispatch(letterErrorClick(selectedLetter));

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

  const setTrainerBlockStateAction = (state: boolean) =>
    dispatch(setTrainerBlockState(state));

  function handleGuessedClick(selectedLetter: LetterType) {
    const currentLetter = currentWord.literal.charAt(currentWord.currentLetter);

    if (currentLetter === selectedLetter.literal) {
      guessLetterAction(selectedLetter);
      addToAnswer(selectedLetter);
    } else {
      letterErrorClickAction(selectedLetter);
    }

    checkEndOfWordEvent();
  }

  return (
    <div className={`letters__block ${lettersBlockClass}`}>
      {currentWord.shuffled.map((letter, i) => (
        <Letter
          {...letter}
          key={i}
          letterClick={(l) => handleGuessedClick(l)}
        />
      ))}
    </div>
  );
}
