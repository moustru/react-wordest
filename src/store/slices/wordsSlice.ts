/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";
import { setWordsArray } from "@/helpers/words";
import type { LetterType, WordObject } from "@/types/Word";

interface WordsState {
  wordsForTrainer: WordObject[];
  currentWordNumber: number;
}

type EndOfWordPayload = Record<
  "right" | "left",
  () => ReturnType<typeof setTimeout>
>;

const wordsSlice = createSlice({
  name: "words",
  initialState: <WordsState>{
    wordsForTrainer: setWordsArray(),
    currentWordNumber: 0,
  },

  reducers: {
    guessLetter(state, action: PayloadAction<LetterType>) {
      const currentWord = state.wordsForTrainer[state.currentWordNumber];

      currentWord.currentLetter = ++currentWord.currentLetter;
      currentWord.shuffled = currentWord.shuffled.filter(
        (letter) => letter.id !== action.payload.id
      );
    },

    letterErrorClick(state, action: PayloadAction<LetterType>) {
      const currentWord = state.wordsForTrainer[state.currentWordNumber];

      currentWord.mistakes = ++currentWord.mistakes;
      currentWord.shuffled = currentWord.shuffled.map((letter) => {
        if (letter.id !== action.payload.id) return letter;
        else
          return {
            ...letter,
            bgClass: "letter--danger",
          };
      });
    },

    letterErrorKeydown(state) {
      const currentWord = state.wordsForTrainer[state.currentWordNumber];

      currentWord.mistakes = ++currentWord.mistakes;
    },

    nextWord(state) {
      state.currentWordNumber = ++state.currentWordNumber;
    },

    checkEndOfWord(state, action: PayloadAction<EndOfWordPayload>) {
      const currentWord = state.wordsForTrainer[state.currentWordNumber];
      const { right, left } = action.payload;

      if (currentWord.literal.length === currentWord.currentLetter + 1) {
        state.currentWordNumber === 5 ? right() : left();
      }
    },
  },
});

export const selectCurrentWordObject = createSelector(
  (state: WordsState) => state.wordsForTrainer,
  (state: WordsState) => state.currentWordNumber,
  (wordsForTrainer, currentWordNumber) => wordsForTrainer[currentWordNumber]
);

export const {
  guessLetter,
  letterErrorClick,
  letterErrorKeydown,
  nextWord,
  checkEndOfWord,
} = wordsSlice.actions;

export default wordsSlice.reducer;
