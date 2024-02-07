import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
export const fetchBrands = createAsyncThunk(
  "BrandSlice/fetchBrands",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/Brands");
    const data = await res.json();
    return data;
  }
);
interface BrandState {
  Brand: { id:  string | undefined; img:string}[],
 loading:boolean
}
const initialState: BrandState = {
  Brand: [],
  loading:false
}
export const BrandSlice = createSlice({
  name: 'BrandSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.Brand = action.payload
      state.loading=true
    });
  },
})


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default BrandSlice.reducer