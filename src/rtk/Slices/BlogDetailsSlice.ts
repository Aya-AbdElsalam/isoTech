import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
// Define a type for the slice state

export const fetchChoosenBlog = createAsyncThunk(
    "BlogDetailsSlice/fetchChoosenBlog",
    async (id: string | undefined) => {
        const res = await fetch(`https://isotechdata.onrender.com/Blogs/${id}`)
        const data = await res.json();
        return data;
    }
);

interface BlogState {
    loading: boolean,
    Blog: { id: string | number; title: string, value: string, date: string, description: string, img: string },
}
const initialState: BlogState = {
    loading: false,
    Blog: { id: "" , title: "", value: "", date: "", description: "", img: "" },
}
export const BlogDetailsSlice = createSlice({
    name: 'BlogDetailsSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChoosenBlog.fulfilled, (state, action) => {
            state.loading = true;
            state.Blog = action.payload
        });
      

    },
})


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default BlogDetailsSlice.reducer