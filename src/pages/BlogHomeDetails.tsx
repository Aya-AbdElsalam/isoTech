import { useNavigate, useParams } from "react-router-dom"
import { fetchChoosenBlog } from "../rtk/Slices/BlogSlice"
import { useEffect } from "react"
import { AppDispatch, RootState } from "../rtk/Store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { Box, Skeleton } from "@mui/material"
import { Typography } from "@mui/material"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { fetchBlog } from "../rtk/Slices/BlogSlice"
export default function BlogHomeDetails() {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    let blog = selector((state) => {
        return state.BlogSlice.BlogChoosen
    });
    let blogs = selector((state) => {
        return state.BlogSlice.Blog
    });
    const loading = selector((state) => {
        return state.BlogSlice.loadingChoosen
    });
    const loadingBlogs = selector((state) => {
        return state.BlogSlice.loading
    });
    const nextBlog = selector((state) => {
        return state.BlogSlice.nextBlog
    });
    const backBlog = selector((state) => {
        return state.BlogSlice.backBlog
    });
    console.log(nextBlog)
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        dispatch(fetchChoosenBlog(params.id))
        dispatch(fetchBlog())
        if (loading) {
            const blogDiv = document.getElementById("blog") as HTMLDivElement
            blogDiv.innerHTML = blog.value

        }
        if (loadingBlogs) {
            blogs.find((b, index) => {
                if (b.id == blog.id) {
                    setActiveStep(index)
                }
            })
        }
    }, [activeStep, blog.value, dispatch, loading, params.id, loadingBlogs])
    const theme = useTheme();
    const handleNext = () => {
        navigate(`../Blog/${nextBlog?.id}/${nextBlog?.title}`)
    };
    const handleBack = () => {
        navigate(`../Blog/${backBlog?.id}/${backBlog?.title}`)
    };
    return (
        <>
            <Box height={"600px"}>
                {loading ? <img src={blog.img} width={"100%"} height={"100%"} alt="">
                </img> : <Skeleton variant="rectangular" height={"100%"} width={"100%"}></Skeleton>}
            </Box>
            <Box sx={{ mt: "20px", mb: "40px", paddingX: { xs: "30px", md: "150px", lg: "200px" } }} >
                {loading ? <><Typography variant="h1" fontSize={{ xs: "30px", md: "45px" }} fontWeight={"bold"}>{blog.title}</Typography><Typography fontSize={"14px"} sx={{ color: "var(--txt--second)" }}>{blog.date}</Typography><Box id="blog"></Box>
                    <MobileStepper
                        steps={blogs.length}
                        position="static"
                        activeStep={activeStep}
                        sx={{ maxWidth: "100%", mt: "60px", flexGrow: 1, mx: "auto", background: "transparent" }}
                        nextButton={
                            <Button size="small" aria-labelledby="next" onClick={handleNext} disabled={activeStep === blogs.length - 1}>
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" aria-labelledby="back" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </> : Array.from(new Array(16)).map(() => {
                    return <Skeleton width={"100%"} height={"50px"}></Skeleton>
                })}

            </Box>

        </>


    )

}