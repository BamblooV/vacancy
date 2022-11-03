import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HHVacanciesApi, normalizeHH } from "../../models/HH/index";

export const fetchVacancies = createAsyncThunk(
  "vacancy/fetchVacancies",
  async (text: string, thunkAPI) => {
    try {
      const vacanciesResponse = await axios.get<HHVacanciesApi>(
        "https://api.hh.ru/vacancies?text=" + text
      );
      const prom = await Promise.all(
        vacanciesResponse.data.items.map(async (item) => {
          const vacancyResponse = await axios.get(
            "https://api.hh.ru/vacancies/" + item.id
          );
          const employerResponse = await axios.get(item.employer.url);
          return normalizeHH(vacancyResponse.data, employerResponse.data);
        })
      );
      return prom;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить список вакансий");
    }
  }
);
