import { useEffect } from "react"
import { fetchfeedback } from "../../rtk/Slices/Feedback"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../rtk/Store"
import { Card, CardContent, Skeleton, Typography } from "@mui/joy"
import { Avatar } from "@mui/material"
import Title from "../../component/Title"
import * as React from 'react';
import { IconButton } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import {
    Box,
    CircularProgress,
} from "@mui/material";
import { green } from '@mui/material/colors';
import { useState } from "react";
import { fetchProducts } from "../../rtk/Slices/ProductSlice"
import { Link } from "react-router-dom"
export default function Comments() {
    const dispatch = useDispatch<AppDispatch>()
    const [load, setLoading] = useState(false)
    const [success] = React.useState(false);

    useEffect(() => {
        dispatch(fetchfeedback())
        dispatch(fetchProducts())
    })
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const comments = selector((state) => {
        return state.FeedbackSlice.feedback
    });
    const products = selector((state) => {
        return state.ProductSlice.product
    });
    const loading = selector((state) => {
        return state.FeedbackSlice.loading
    });
    const loadingProduct = selector((state) => {
        return state.ProductSlice.loading
    });
    const buttonSx = {
        fontSize: "12px",
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    return (
        <>
            <Title title="Feedback" />
            {loading ? comments.map((f: { idProduct: string | number, date: string, img: string, user: string | number, comment: string | number, id: number | string }) => {
                const commentProduct = products.find((p) => {
                    return p.id == f.idProduct
                })
                return (
                    <Card

                        variant="outlined"
                        sx={{ width: '100%', borderRadius: 0, '--Card-radius': "15px", my: "8px", boxSizing: "border-box" }}
                    >
                        {loadingProduct ?
                            <Link to={`../../Shop/${commentProduct?.id}/${commentProduct?.title}`}>

                                <CardContent>
                                    <Avatar variant='square' sx={{ width: "160px", height: "160px", outline: "1px solid black", padding: "2px" }} >
                                        {commentProduct && <img loading="lazy"
                                            alt=''
                                            style={{ width: "160px", height: "160px" }}
                                            src={commentProduct.img || commentProduct.color[0].img}

                                        />}
                                    </Avatar>
                                    <div>
                                        <Typography fontWeight={"bold"}>{commentProduct?.title}</Typography>
                                        <Typography>{commentProduct?.price}$</Typography>
                                    </div>
                                </CardContent> </Link> : <Skeleton animation="wave" variant="rectangular" sx={{ width: "160px", height: "160px" }} />}
                        <CardContent orientation="horizontal" >

                            <Avatar variant='square' sx={{ width: "60px", height: "60px", outline: "1px solid black", padding: "2px" }} >
                                <img loading="lazy"
                                    alt=''
                                    style={{ width: "60px", height: "60px" }}
                                    src={f.img}
                                />
                            </Avatar>
                            <div>
                                <Typography fontWeight={"bold"}>{f.user}</Typography>
                                <Typography>{f.date}</Typography>
                            </div>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                    sx={buttonSx}
                                    type="submit"
                                    aria-labelledby="submit"
                                    disabled={load}
                                    onClick={() => {
                                        setLoading(true)
                                        fetch(`https://isotechdata.onrender.com/feedback/${f.id}`, {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        })
                                            .then((res) => res.json()).then(() => { dispatch(fetchfeedback()); dispatch(fetchProducts()) }).then(() =>
                                                setTimeout(() => {
                                                    setLoading(false)
                                                }, 3000)

                                            )
                                    }}><DeleteForever />

                                </IconButton>
                                {load && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>
                        </CardContent>

                        <CardContent sx={{ gap: 0.5, mt: 1 }}>
                            <Typography>{f.comment}</Typography>
                        </CardContent>
                    </Card>
                )
            }
            ) : Array.from(new Array(6)).map((i, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{ width: '100%', borderRadius: 0, '--Card-radius': "15px", my: "8px", boxSizing: "border-box" }}
                >
                    <CardContent orientation="horizontal">
                        <Skeleton variant="rectangular" width={44} height={44} />
                        <div>
                            <Skeleton variant="text" width={100} />
                            <Skeleton level="body-sm" variant="text" width={200} />
                        </div>
                    </CardContent>
                    <CardContent sx={{ gap: 0.5, mt: 1 }}>
                        <Skeleton level="body-xs" variant="text" width="92%" />
                        <Skeleton level="body-xs" variant="text" width="99%" />
                        <Skeleton level="body-xs" variant="text" width="96%" />
                    </CardContent>
                </Card>
            ))}

        </>
    )
}