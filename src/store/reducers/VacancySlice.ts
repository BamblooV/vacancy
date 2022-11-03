import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HHModel } from "../../models/HH";
import { fetchVacancies } from "./ActionCreator";

interface VacancyState {
  vacancies: HHModel[];
  isLoading: boolean;
  error: string;
  filteredVacancies: HHModel[];
  numberToRendered: number;
}

const initialState: VacancyState = {
  vacancies: [],
  isLoading: false,
  error: "",
  filteredVacancies: [],
  numberToRendered: 3,
};

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    filterVacancies(state, action) {
      state.numberToRendered = 3;
      state.filteredVacancies = state.vacancies.filter(
        (item) => item.schedule.id === action.payload
      );
    },
    clearSotring(state) {
      state.numberToRendered = 3;
      state.filteredVacancies = state.vacancies;
    },
    showMoreVacancies(state) {
      state.numberToRendered += 3;
    },
  },
  extraReducers: {
    [fetchVacancies.fulfilled.type]: (
      state,
      action: PayloadAction<HHModel[]>
    ) => {
      state.numberToRendered = 3;
      state.isLoading = false;
      state.error = "";
      state.vacancies = action.payload;
      state.filteredVacancies = action.payload;
    },
    [fetchVacancies.pending.type]: (state) => {
      state.numberToRendered = 3;
      state.filteredVacancies = [];
      state.isLoading = true;
    },
    [fetchVacancies.rejected.type]: (state, action: PayloadAction<string>) => {
      state.numberToRendered = 3;
      state.filteredVacancies = [];
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default vacancySlice.reducer;
export const { filterVacancies, showMoreVacancies, clearSotring } =
  vacancySlice.actions;
