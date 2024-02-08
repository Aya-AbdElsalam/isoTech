import * as React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { fetchBlog } from '../../rtk/Slices/BlogSlice';
import { AppDispatch, RootState } from '../../rtk/Store';
import Title from '../../component/Title';
import BlogCard from '../../component/BlogCard';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Blog() {
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
            <Title title="BLOGS" />
            <Container sx={{ my: "40px" }}>
                <BlogCard loading={loading} blogs={blogs} admin={true} />
                <Link to="addBlog">
                    <Button sx={{ mb: "40px", mt: "15px" }} variant='contained'>ADD BLOG</Button>
                </Link>
            </Container>
        </>
    )
}