import Landding from "../component/Landding";
import TrendingProducts from "../component/TrendingProducts";
import TrendingProductsWeek from "../component/TrendingProductsWeek";
import Brands from "../component/Brands";
import SubTitle from "../component/SubTitle";
import { Container } from "@mui/material";
import BlogCard from "../component/BlogCard";
import * as React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../rtk/Store";
import { fetchBlog } from "../rtk/Slices/BlogSlice";
export default function Home() {
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    React.useEffect(() => {
        dispatch(fetchBlog());
    }, []);
    const blogs = selector((state) => {
        return state.BlogSlice.Blog;
    });
    const loading = selector((state) => {
        return state.BlogSlice.loading;
    });
    return (
        <>
            <Landding></Landding>
            <TrendingProducts />

            <TrendingProductsWeek />
            <Container sx={{ my: "40px" }}>
                <SubTitle title="BLOG" />
                <BlogCard loading={loading} blogs={blogs.slice(0, 3)} admin={false} />
            </Container>
            <Brands />
        </>
    )
}