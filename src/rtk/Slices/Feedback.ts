import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
export const fetchfeedback = createAsyncThunk(
  "feedbacklice/fetchfeedback",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/feedback");
    const data = await res.json();
    return data;
  }
);

interface feedbackState {
  feedback: {idProduct:string|number,id:number|string,date:string,img:string,user:string|number,comment:number|string,idUser:number|string}[],
  loading: boolean
}
const initialState: feedbackState = {
  feedback: [{idProduct:"",id:"",date:"",img:"",user:"",comment:"",idUser:""}],
  loading: false,
}
export const FeedbackSlice = createSlice({
  name: 'feedbackSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchfeedback.fulfilled, (state, action) => {
      state.loading = true;
      state.feedback = action.payload;
    });  
  },
})


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default FeedbackSlice.reducer