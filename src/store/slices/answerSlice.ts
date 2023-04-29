import { LetterType } from "@/types/Word";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AnswerState {
  answer: LetterType[];
}

const answerSlice = createSlice({
  name: "answer",

  initialState: <AnswerState>{
    answer: [],
  },

  reducers: {
    addLetterToAnswer(state, action: PayloadAction<LetterType>) {
      state.answer.push(action.payload);
    },

    resetAnswerState(state) {
      state.answer = [];
    },
  },
});

export const { addLetterToAnswer, resetAnswerState } = answerSlice.actions;

export default answerSlice.reducer;
