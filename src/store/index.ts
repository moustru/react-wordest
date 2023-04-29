import { configureStore } from "@reduxjs/toolkit";
import answerReducer from "./slices/answerSlice";
import wordsReducer from "./slices/wordsSlice";
import trainerSlice from "./slices/trainerSlice";

export const store = configureStore({
  reducer: {
    answerState: answerReducer,
    wordsState: wordsReducer,
    trainerState: trainerSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
