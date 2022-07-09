import { createSlice } from "@reduxjs/toolkit";


export const crudApiSlice = createSlice({
  name: "crudApi",
  initialState: {
    db: [],
  },
  reducers: {
    readAllData: (state: any, action: any) => {
      return {
        ...state,
        db: action.payload.map((data: any) => data),
      };
    },
    createApiData: (state: any, action: any) => {
      return {
        ...state,
        db: [...state.db, action.payload],
      };
    },
    updateApiData: (state: any, action: any) => {
      let newData = state.db.map((el: any) =>
        el.id === action.payload.id ? action.payload : el
      );
      return {
        ...state,
        db: newData,
      };
    },
    deleteApiData: (state: any, action: any) => {
      let newData = state.db.filter((el: any) => el.id !== action.payload);
      return {
        ...state,
        db: newData,
      };
    },
    noData: (state:any) => {
      return state;
    },
    default: (state: any) => {
      return state.value = state;
    },
  },
});

export const { readAllData, createApiData, updateApiData, deleteApiData, noData } =
  crudApiSlice.actions;

export const selectCrudApi = (state: any) => state.crudApi;
export default crudApiSlice.reducer;



