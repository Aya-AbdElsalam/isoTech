import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './Slices/ProductSlice'
import BlogSlice from './Slices/BlogSlice'
import CartSlice from './Slices/CartSlice'
import TeamSlice from './Slices/TeamSlice'
import  FeedbackSlice  from './Slices/Feedback'
import  signInlice  from './Slices/UserSlice'
import wishListSlice from './Slices/wishListSlice'
import ProductDetailsSlice from './Slices/ProductDetailsSlice'
import BrandSlice from './Slices/BrandSlice'
import BlogDetailsSlice from './Slices/BlogDetailsSlice'
import mailSlice  from './Slices/MailSlice'

export const store = configureStore({
  reducer: {
    ProductSlice,
    BlogSlice,
    CartSlice,
    TeamSlice,
    signInlice,
    FeedbackSlice,
    wishListSlice,
    ProductDetailsSlice,
    BrandSlice,
    BlogDetailsSlice,
    mailSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch