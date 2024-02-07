import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../Store'
export const fetchProducts = createAsyncThunk(
  "ProductSlice/fetchProducts",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/Products");
    const data = await res.json();
    return data;
  }
);

export const fetchcategories = createAsyncThunk(
  "ProductSlice/fetchcategories",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/categories");
    const data = await res.json();
    return data;
  }
);

export const fetchProductsTrendingWeek = createAsyncThunk(
  "ProductSlice/fetchProductsTrendingWeek",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/TrendingThisWeek");
    const data = await res.json();
    return data;
  }
);
export const fetchProductsTrending = createAsyncThunk(
  "ProductSlice/fetchProductsTrending",
  async () => {
    const res = await fetch("https://isotechdata.onrender.com/trandingProducts");
    const data = await res.json();
    return data;
  }
);
interface productType {
  img: string | undefined;
  id: string | number;
  title: string;
  price: string;
  categorie: string;
  qty: string | number;
  color: {
    img: string;
    color: string;
  }[];
}

interface ProducState {
  product: productType[],
  productAll: productType[],
  productAllTrending: productType[],
  productAllTrendingWeek: productType[],

  categories: { id: number | string; categorie: string }[],
  loadingCategories: boolean,
  loading: boolean,
  filterColor: string,
  filterCat: string,
  filterPriceMin: string | number,
  filterPriceMax: string | number,
  filterSort: string,
  filterimg: productType[],
  productTrendingWeek: productType[],
  productTrending: productType[],
  loadingProductTrendingWeek: boolean,
  loadingProductTrending: boolean,
  filterSearch: string
}
const initialState: ProducState = {
  productAll: [],
  productAllTrending: [],
  productAllTrendingWeek: [],
  product: [],
  loading: false,
  categories: [],
  loadingCategories: false,
  filterColor: "all",
  filterCat: "all",
  filterPriceMin: "230",
  filterPriceMax: "380",
  filterSort: "",
  filterimg: [],
  filterSearch: "",
  productTrendingWeek: [],
  productTrending: [],
  loadingProductTrendingWeek: false,
  loadingProductTrending: false
}

export const ProductSlice = createSlice({
  name: 'ProductSlice',
  initialState,

  reducers: {

    FilterColor(state, action) {
      state.filterColor = action.payload
    },
    FilterSearch(state, action) {
      state.filterSearch = action.payload.toString().trim().toLowerCase()
    },
    FilterCat(state, action) {
      state.filterCat = action.payload.toLowerCase()
    },
    FilterPriceMin(state, action) {
      state.filterPriceMin = action.payload
    },
    FilterPriceMax(state, action) {
      state.filterPriceMax = action.payload
    },
    FilterSort(state, action) {
      state.filterSort = action.payload
    },
    FilterImg(state) {
      state.filterimg = state.product.filter((i) => {
        return i.color
      })

    },
    FilterApply(state) {
      state.product = state.productAll
      state.product = state.product.filter((i) => {
        if (!i.color||i.color.length===0 || state.filterColor.toLowerCase() === "all") {
          if (state.filterCat !== "all") {
            if (state.filterSearch == "") {
              return (i.categorie.toLowerCase() === state.filterCat &&
                +i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin)
            }
            else {
              return (i.categorie.toLowerCase() === state.filterCat &&
                +i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin && i.title.includes(state.filterSearch))
            }

          }
          else if (state.filterCat === "all") {
            if (state.filterSearch === "") {
              return (
                +i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin)
            }
            else {
              return (+i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin && i.title.includes(state.filterSearch))
            }
          }
        }
        else if (i.color) {
          let a: string[] = []
          i.color.map((ii: { color: string }): void => {
            a.push(ii.color)
          })


          if (state.filterCat !== "all" && state.filterColor.toLocaleLowerCase() !== "all") {
            if (state.filterSearch === "") {
              return (i.categorie.toLowerCase() === state.filterCat &&
                +i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin &&
                a.includes(state.filterColor))
            }
            else {
              return (i.categorie.toLowerCase() === state.filterCat &&
                +i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin &&
                a.includes(state.filterColor) && i.title.includes(state.filterSearch))
            }
          }
          else if (state.filterCat === "all" && state.filterColor.toLocaleLowerCase() !== "all") {
            if (state.filterSearch === "") {
              return (
                +i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin) &&
                a.includes(state.filterColor)
            }
            else {
              return (
                +i.price <= +state.filterPriceMax &&
                +i.price >= +state.filterPriceMin) &&
                a.includes(state.filterColor) && i.title.includes(state.filterSearch)
            }

          }
        }
      })
      if (state.filterSort === "Higher price") {
        state.product = state.product.sort((a, b) => {
          return parseFloat(a.price) >= parseFloat(b.price) ? -1 : 1;
        })
      }
      else if (state.filterSort === "Lower price") {
        state.product = state.product.sort((a, b) => {
          return parseFloat(a.price) >= parseFloat(b.price) ? 1 : -1;
        })
      }
    },
    FilterHomeProducts(state, action) {
      state.productTrending = state.productAllTrending
      state.productTrending = action.payload === "all" ? state.productTrending : state.productTrending.filter((i) => {
        return action.payload.toLowerCase() === i.categorie.toLowerCase()
      })

    },
    FilterHomeProductsWeek(state, action) {
      state.productTrendingWeek = state.productAllTrendingWeek
      state.productTrendingWeek = action.payload === "all" ? state.productTrendingWeek : state.productTrendingWeek.filter((i) => {
        return action.payload.toLowerCase() === i.categorie.toLowerCase()
      })

    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = true;
      state.productAll = action.payload
      state.product = action.payload
      if (state.filterCat.toLowerCase() !== "all") {
        state.product = state.productAll
        state.product = state.product.filter((i) => {
          return i.categorie.toLowerCase() === state.filterCat
        })
      }

    });
    builder.addCase(fetchcategories.fulfilled, (state, action) => {
      state.loadingCategories = true;
      state.categories = action.payload;
    });
    builder.addCase(fetchProductsTrending.fulfilled, (state, action) => {
      state.loadingProductTrending = true;
      state.productTrending = action.payload;
      state.productAllTrending = action.payload
    });
    builder.addCase(fetchProductsTrendingWeek.fulfilled, (state, action) => {
      state.loadingProductTrendingWeek = true;
      state.productTrendingWeek = action.payload;
      state.productAllTrendingWeek = action.payload

    });
  },
})

export const { FilterSearch, FilterHomeProductsWeek, FilterHomeProducts, FilterImg, FilterCat, FilterColor, FilterPriceMax, FilterPriceMin, FilterSort, FilterApply } = ProductSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default ProductSlice.reducer