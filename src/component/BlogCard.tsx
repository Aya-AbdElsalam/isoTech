import { CardContent, Card, IconButton, Typography, AspectRatio, Button } from '@mui/joy';
import { Stack, Skeleton, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { EditNote, DeleteForever } from '@mui/icons-material';
import { useState } from 'react';
import * as React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { green } from '@mui/material/colors';
import { fetchBlog } from '../rtk/Slices/BlogSlice';
import { AppDispatch, RootState } from '../rtk/Store';
export default function BlogCard(props: { loading: boolean; admin?: boolean; blogs: { id: string | number; title: string, value: string, date: string, description: string, img: string }[] }) {
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const navigate = useNavigate()
    const [success] = React.useState(false);
    const [load, setLoading] = useState(false)
    const loading = selector((state) => {
        return state.BlogSlice.loading;
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
            <Stack direction={"row"} gap={3} flexWrap={"wrap"} >
                {(props.loading ? props.blogs : Array.from(new Array(6))).map((b, index) => {
                    return (<Card sx={{ width: 320, flexGrow: "1" }} key={index} >
                        {props.loading ? <div>
                            <Typography level="title-lg">{b.title}</Typography>
                            <Typography level="body-sm">{b.date}</Typography>
                            <Stack flexDirection={"row"}>
                                {props.admin && <IconButton
                                    aria-label="bookmark Bahamas Islands"
                                    variant="plain"
                                    color="neutral"
                                    onClick={() => {
                                        navigate(`edit/${b.id}`)
                                    }}
                                >
                                    <EditNote sx={{ fontSize: "40px" }} />
                                </IconButton>}
                                {props.admin && <IconButton
                                    sx={buttonSx}
                                    type="submit"
                                    disabled={load}
                                    onClick={() => {
                                        setLoading(true)
                                        fetch(`https://isotechdata.onrender.com/Blogs/${b.id}`, {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        })
                                            .then((res) => res.json()).then(() => { dispatch(fetchBlog()) }).then(() =>
                                                loading && setTimeout(() => {
                                                    setLoading(false)
                                                }, 3000)
                                            )
                                    }}><DeleteForever sx={{ fontSize: "30px" }} />

                                </IconButton>
                                }
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
                            </Stack>
                        </div> : <Skeleton variant="rectangular" width={"100%"} height={"20px"}></Skeleton>}
                        <AspectRatio minHeight="120px" maxHeight="200px">
                            {props.loading ? <img
                                src={b.img}
                                srcSet={b.img}
                                loading="lazy"
                                alt=""
                            /> : <Skeleton variant="rectangular" height={"100%"} width={"100%"}></Skeleton>}
                        </AspectRatio>
                        <CardContent orientation="horizontal">
                            <div>
                                <Typography fontSize="md" fontWeight="lg">

                                    {props.loading ? b.description?.slice(0, 70) : (<Skeleton width={"100%"} height={"50px"}></Skeleton>)}...
                                </Typography>
                            </div>
                            <Button
                                variant="solid"
                                size="md"
                                color="primary"
                                aria-label="Explore"
                                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                onClick={() => {
                                    props.loading && navigate(`../../Blog/${b.id}/${b.title}`)
                                }}
                            >
                                Read more
                            </Button>
                        </CardContent>
                    </Card>)
                })}
            </Stack>
        </>
    )
}