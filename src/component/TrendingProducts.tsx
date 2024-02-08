import * as React from 'react';
import { AppDispatch, RootState } from '../rtk/Store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FilterHomeProducts, fetchProductsTrending, fetchcategories } from '../rtk/Slices/ProductSlice';
import CardProductsHome from './CardProductHome';
export default function TrendingProducts() {
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const Categories = selector((state) => {
        return state.ProductSlice.categories;
    });
    const products = selector((state) => {
        return state.ProductSlice.productTrending
    });
    const loading = selector((state) => {
        return state.ProductSlice.loadingProductTrending
    });

    React.useEffect(() => {
        dispatch(fetchProductsTrending());
        dispatch(fetchcategories());
    }, [dispatch]);

    return (
        <CardProductsHome action2={FilterHomeProducts("")} loading={loading} products={products} Categories={Categories} />
    )
}