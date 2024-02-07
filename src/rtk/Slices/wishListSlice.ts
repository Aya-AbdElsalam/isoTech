import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'

// Define a type for the slice state
interface wishList {
  img: string
  id: number | string,
  idUser: number | string,
  title: string,
  price: number | string,
  categorie: string,
  color: [{ color: string, img: string }],
  qty: number
}
interface wishListState {
  wishListItems: wishList[],
  userItems: wishList[],

}
const initialState: wishListState = {
  wishListItems: JSON.parse(localStorage.getItem('wishListItems')!) || [],
  userItems: JSON.parse(localStorage.getItem('WishListuserItems')!) || []
}
function user(state: { wishListItems: { img: string; id: string | number; idUser: string | number; title: string; price: string | number; categorie: string; color: [{ color: string; img: string }]; qty: number }[]; userItems: { img: string; id: string | number; idUser: string | number; title: string; price: string | number; categorie: string; color: [{ color: string; img: string }]; qty: number }[] }) {
  const user = JSON.parse(localStorage.getItem('user')!)
  state.userItems = state.wishListItems.filter((p) => {
    return p.idUser == user.id
  })
  localStorage.setItem("WishListuserItems", JSON.stringify(state.userItems));
}
function deleteFromwish(state: { wishListItems: { img: string; id: string | number; idUser: string | number; title: string; price: string | number; categorie: string; color: [{ color: string; img: string }]; qty: number }[]; userItems: { img: string; id: string | number; idUser: string | number; title: string; price: string | number; categorie: string; color: [{ color: string; img: string }]; qty: number }[] }, action: { payload: { id: string | number; img: string; PRODUCT: string }; type?: string }) {
  state.wishListItems = state.wishListItems.filter((i) => {
    return (i.id != action.payload.id && i.img !== action.payload.img && i.title !== action.payload.PRODUCT && i.idUser == JSON.parse(localStorage.getItem("user")!).id) || i.idUser != JSON.parse(localStorage.getItem("user")!).id
  })
  localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems));
  user(state)
  localStorage.setItem("WishListuserItems", JSON.stringify(state.userItems));
};
export const wishListSlice = createSlice({
  name: 'wishListSlice',
  initialState,
  reducers: {
    userItemWish(state) {
      user(state)
    },
    removeItemsWish(state) {
      localStorage.removeItem("WishListuserItems")
      state.userItems = []
    },
    addTowishList(state, action) {
      user(state)
      const item = state.userItems.find((product) => {
        return (
          product.color === action.payload.color &&
          +product.id === +action.payload.id
        );
      });
      if (item) {
        deleteFromwish(state, action)
      } else {
        state.wishListItems.push(action.payload);
        state.userItems.push(action.payload);
      }
      localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems));
      localStorage.setItem("WishListuserItems", JSON.stringify(state.userItems));

    },
    deleteFromwishList(state, action) {
      deleteFromwish(state, action)
    },
    clearWishList(state) {
      state.wishListItems = state.wishListItems.filter((i) => {
        return JSON.parse(localStorage.getItem('user')!).id != i.idUser
      })
      localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems));
      user(state)
      localStorage.setItem("WishListuserItems", JSON.stringify(state.userItems));
    }
  }
}
)

export const { addTowishList, userItemWish, removeItemsWish, deleteFromwishList, clearWishList } = wishListSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default wishListSlice.reducer