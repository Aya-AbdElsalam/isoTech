import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
// Define a type for the slice state
interface user {
  id: number | string,
  email: string,
  pass: string | number,
  name: string | number,
}
interface signIntate {
  SignIn: user[],
  loading: boolean,
  user: user | null
}
export const fetchsignIn = createAsyncThunk(
  "signInlice/fetchsignIn",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/signIn");
    const data = await res.json();
    return data;
  }
);

const initialState: signIntate = {
  SignIn: [],
  user: null,
  loading: false,
}


export const signInlice = createSlice({
  name: 'signInlice',
  initialState,
  reducers: {
    fetchUser(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload))
      state.user = action.payload
    },
     removeUser(state) {
      localStorage.removeItem("user")
      state.user = null
    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchsignIn.fulfilled, (state, action) => {
      state.loading = true;
      state.SignIn = action.payload;
    }); 
  },
})

export const { fetchUser,removeUser } = signInlice.actions

export const selectCount = (state: RootState) => state

export default signInlice.reducer