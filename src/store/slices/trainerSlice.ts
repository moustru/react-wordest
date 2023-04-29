import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
  name: "trainer",
  initialState: true,

  reducers: {
    setTrainerBlockState(state, action: PayloadAction<boolean>) {
      state = action.payload;
    },
  },
});

export const { setTrainerBlockState } = trainerSlice.actions;

export default trainerSlice.reducer;
