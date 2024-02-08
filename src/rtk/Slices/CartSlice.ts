import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
interface cart {
  img: string
  id: number | string,
  idUser: number | string,
  title: string,
  price: number | string,
  categorie: string,
  color: [{ color: string, img: string }],
  qty: number
}
interface cartState {
  CartItems: cart[],
  userItems: cart[],

}
const initialState: cartState = {
  CartItems: JSON.parse(localStorage.getItem('CartItems')!) || [],
  userItems: JSON.parse(localStorage.getItem('userItems')!) || []
}
function user(state: { CartItems: { img: string; id: string | number; idUser: string | number; title: string; price: string | number; categorie: string; color: [{ color: string; img: string }]; qty: number }[]; userItems: { img: string; id: string | number; idUser: string | number; title: string; price: string | number; categorie: string; color: [{ color: string, img: string }]; qty: number }[] }) {
  const user = JSON.parse(localStorage.getItem('user')!)
  state.userItems = state.CartItems.filter((p) => {
    return p.idUser.toString() === user.id.toString()
  })
  localStorage.setItem("userItems", JSON.stringify(state.userItems));
}
export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    userItem(state) {
      user(state)
    },
    removeItems(state) {
      localStorage.removeItem("userItems")
      state.userItems = []
    },
    addToCart(state, action) {
      user(state)
      const item = state.userItems.find((product) => {
        return (
      typeof( product.color)==="object"?  product.id.toString() === action.payload.id.toString():  product.color === action.payload.color &&
          product.id.toString() === action.payload.id.toString()
        );
      });
      if (item) {
        item.qty = (item.qty) + action.payload.qty;
      } else {
        state.CartItems.push(action.payload);
        state.userItems.push(action.payload);
      }
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
      localStorage.setItem("userItems", JSON.stringify(state.userItems));
    },
    updateQty(state, action) {
      const item = state.CartItems.find((i) => {
        return i.id == action.payload.id && i.img == action.payload.img && i.title == action.payload.PRODUCT && i.idUser == JSON.parse(localStorage.getItem("user")!).id
      })
      let txt = document.getElementById(`${action.payload.id}-${action.payload.img}`) as HTMLInputElement
      if (item !== undefined) item.qty = +txt.value
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
      user(state)
      localStorage.setItem("userItems", JSON.stringify(state.userItems));
    },
    updateQtyNum(state, action) {
      let txt = document.getElementById(`${action.payload.id}`) as HTMLInputElement

      const item = state.CartItems.find((i) => {
        return i.id == action.payload.id && i.img == action.payload.img && i.title == action.payload.PRODUCT && i.idUser == JSON.parse(localStorage.getItem("user")!).id
      })

      if (item !== undefined) item.qty =+ +txt.value
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
      user(state)
      localStorage.setItem("userItems", JSON.stringify(state.userItems));
    },
    deleteFromCart(state, action) {
      state.CartItems = state.CartItems.filter((i) => {
        return (i.id.toString() !== action.payload.id.toString() && i.img !== action.payload.img && i.title !== action.payload.PRODUCT && i.idUser.toString() === JSON.parse(localStorage.getItem("user")!).id.toString()) || i.idUser.toString() !== JSON.parse(localStorage.getItem("user")!).id.toString()
      })
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
      user(state)
      localStorage.setItem("userItems", JSON.stringify(state.userItems));
    },
    clear(state) {
      state.CartItems = state.CartItems.filter((i) => {
        return JSON.parse(localStorage.getItem('user')!).id.toString() !== i.idUser.toString()
      })
      localStorage.setItem("CartItems", JSON.stringify(state.CartItems));
      user(state)
      localStorage.setItem("userItems", JSON.stringify(state.userItems));
    }
  }
}
)

export const { updateQty, clear, addToCart, userItem, removeItems, deleteFromCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default cartSlice.reducer