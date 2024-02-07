import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
// Define a type for the slice state

export const fetchChoosenProduct = createAsyncThunk(
    "ProductDetailsSlice/fetchChoosenProduct",
    async (id: string | undefined) => {
        const res = await fetch(`https://isotechdata.onrender.com/Products/${id}`)
        const data = await res.json();
        return data;
    }
);

interface ProducState {
    loading: boolean,
    product: {
        id: number | string,
        title: string,
        price: string,
        categorie: string,
        qty: string | number,
        color: { img: string, color: string }[]
    }
}
const initialState: ProducState = {
    loading: false,
    product:{ id: "",
        title: "",
        price: "",
        categorie: "",
        qty: "",
        color: []}
}
export const ProductDetailsSlice = createSlice({
    name: 'ProductDetailsSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChoosenProduct.fulfilled, (state, action) => {
            state.loading = true;
            state.product = action.payload
        });
    },
})


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default ProductDetailsSlice.reducer