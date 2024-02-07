import { createAsyncThunk, createSlice ,PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../Store'
export const fetchteam = createAsyncThunk(
  "teamlice/fetchteam",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/team");
    const data = await res.json();
    return data;
  }
);

interface team{
    img: string;
    id: number | string;
    name: string;
    jopTitle: string;
    age: string | number
  }
interface teamState {
  team: team[];
  loading: boolean
}
const initialState: teamState = {
  team: [],
  loading: false,
}
export const teamSlice = createSlice({
  name: 'teamSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   
    builder.addCase(fetchteam.fulfilled, (state, action:PayloadAction<(team)[]>) => {
      state.loading = true;
      state.team = action.payload;
    });

  },
})


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default teamSlice.reducer