import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
export const fetchBlog = createAsyncThunk(
  "BlogSlice/fetchBlog",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/Blogs");
    const data = await res.json();
    return data;
  }
);
export const fetchChoosenBlog = createAsyncThunk(
  "BlogDetailsSlice/fetchChoosenBlog",
  async (id: string | undefined) => {
    const res = await fetch(`https://isotechdata.onrender.com/Blogs/${id}`)
    const data = await res.json();
    return data;
  }
);

interface BlogState {
  Blog: { id: string | number; title: string, value: string, date: string, description: string, img: string }[],
  loading: boolean,
  loadingChoosen: boolean,
  BlogChoosen: { id: string | number; title: string, value: string, date: string, description: string, img: string },
  nextBlog: { id: string | number; title: string, value: string, date: string, description: string, img: string } | undefined,

  backBlog: { id: string | number; title: string, value: string, date: string, description: string, img: string } | undefined,

}
const initialState: BlogState = {
  Blog: [],
  loading: false,
  loadingChoosen: false,
  BlogChoosen: { id: "", title: "", value: "", date: "", description: "", img: "" },
  nextBlog: { id: "", title: "", value: "", date: "", description: "", img: "" },
  backBlog: { id: "", title: "", value: "", date: "", description: "", img: "" },

}

export const BlogSlice = createSlice({
  name: 'BlogSlice',
  initialState,

  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.Blog = action.payload
      state.loading = true

    });
    builder.addCase(fetchChoosenBlog.fulfilled, (state, action) => {
      state.loadingChoosen = true;
      state.BlogChoosen = action.payload;

      state.Blog.find((b, index1) => {
        if (b.id == state.BlogChoosen.id) {
          state.nextBlog = state.Blog.find((b, index) => {
            if (index == index1 + 1) { return b }
          })
        }

      })
   state.Blog.find((b, index1) => {
        if (b.id == state.BlogChoosen.id) {
          state.backBlog = state.Blog.find((b, index) => {
            if (index == index1 - 1) { return b }
          })
        }

      })
      
    });


  },
})


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default BlogSlice.reducer