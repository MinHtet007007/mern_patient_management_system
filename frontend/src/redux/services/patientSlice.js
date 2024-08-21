import { createSlice } from "@reduxjs/toolkit";

export const patientSlice = createSlice({
  name: "patientSlice",
  initialState: {
    patients: [],
  },
  reducers: {
    setPatients: (state, { payload }) => {
      state.patients = payload;
    },
  },
});

export const { setPatients } = patientSlice.actions;
export default patientSlice.reducer;
