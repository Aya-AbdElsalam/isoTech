import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
export const fetchMail = createAsyncThunk(
  "mailSlice/fetchMail",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/mail");
    const data = await res.json();
    return data;
  }
);
export const fetchOpenMail = createAsyncThunk(
  "mailSlice/fetchOpenMail",
  async (id: string | undefined) => {
    const res = await fetch(`https://isotechdata.onrender.com/mail/${id}`);
    const data = await res.json();
    return data;
  }
);
interface mailState {
  mail: {"id": number|string,
    "date": string,
    "email": string,
    "phone": number|string,
    "comment":  number|string,
    "name": number|string,
    "idUser": number|string}[],
    loading: boolean,
    openMail: {
        "id": number | string,
    "date": string,
    "email": string,
    "phone": number|string,
    "comment":  number|string,
    "name": number|string,
    "idUser": number|string},
  loadingOpenMail: boolean
}
const initialState: mailState = {
  mail: [{"id": "",
    "date": "",
    "email": "",
    "phone": "",
    "comment": "",
    "name": "",
    "idUser": ""}],
    loading: false,
    openMail: {"id": "",
    "date": "",
    "email": "",
    "phone": "",
    "comment": "",
    "name": "",
    "idUser": ""},
  loadingOpenMail: false,
}
export const mailSlice = createSlice({
  name: 'mailSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMail.fulfilled, (state, action) => {
      state.loading = true;
      state.mail = action.payload;
    });
  builder.addCase(fetchOpenMail.fulfilled, (state, action) => {
      state.loadingOpenMail = true;
      state.openMail = action.payload;
    });
   
  },
})


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default mailSlice.reducer