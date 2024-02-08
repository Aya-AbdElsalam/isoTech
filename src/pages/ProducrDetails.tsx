import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Title from "../component/Title"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../rtk/Store"
import { fetchChoosenProduct } from "../rtk/Slices/ProductDetailsSlice"
import { Box, Button, Container, Skeleton, Stack, TextField, Typography, Tab } from "@mui/material"
import { addToCart } from "../rtk/Slices/CartSlice"
import AlertSign from "../component/Alert"
import * as React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Reviews from "../component/Reviews"
export default function ProductDetails() {
    const user = JSON.parse(localStorage.getItem('user')!)
    const [value, setValue] = useState(1)
    const [add, setAdd] = useState(false)
    const [sign, setSign] = useState(false)
    function handleCloseAdd(): void {
        setAdd(false);
    };
    const [valueTap, setValueTap] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValueTap(newValue);
    };

    function handleCloseSign(): void {
        setSign(false);
    };
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    let products: {
        id: number | string;
        title: string;
        price: string;
        categorie: string;
        qty: string | number;
        color: {
            img: string;
            color: string;
        }[]
    } = selector((state) => {
        return state.ProductDetailsSlice.product
    });
    const loading = selector((state) => {
        return state.ProductDetailsSlice.loading
    });
    useEffect(() => {
        dispatch(fetchChoosenProduct(params.id))
    }, [dispatch, params.id])
    return (
        <>
            <Title title={`Product/ ${params.title}`} />
            <Container>
                <Stack direction={"row"} my={"40px"} gap={2} flexWrap={"wrap"} justifyContent={"center"}>
                    {loading ? <Box width={"400px"} flexGrow={".5"} sx={{ background: "white" }}>
                        <img loading="lazy" src={products.color[0].img} alt="" style={{ width: "100%", height: "400px" }} id={`${products.id}${products.price}`}></img>
                    </Box> : <Skeleton variant="rectangular" width={"100%"} height={"400px"}></Skeleton>}
                    <Box width={"400px"} flexGrow={"1"} sx={{ background: "white" }} p={"20px"}>
                        {loading ? <><Typography color={"var(--txt--second)"}><Typography fontWeight={"bold"} display={"inline-block"}>Vendor:</Typography> Isotech - Electronics Products</Typography><Typography variant="h4" fontWeight={"bold"}>{products.title}</Typography><Typography variant="h5" my={"5px"}>{products.price}$</Typography><Typography>COLOR</Typography><Stack gap={1} flexDirection={"row"} my={"10px"}>
                            {products.color && products.color.map((i: { color: string; img: string }, index: number) => (
                                <Box
                                    key={index}
                                    onClick={((e) => {
                                        const { target } = e
                                        if (target instanceof HTMLElement) {
                                            let imgChange = document.getElementById(`${products.id}${products.price}`) as HTMLImageElement
                                            let img = products.color.find((i: { color: string }) => {
                                                return i.color === target.classList[0]
                                            })
                                            imgChange.src = img?.img!
                                        }
                                    })}
                                    className={i.color}
                                    sx={{ backgroundColor: `${i.color}`, cursor: "pointer" }} borderRadius={"50%"} width={"20px"} height={"20px"} border={"1px solid black"}>
                                </Box>
                            ))}
                        </Stack><Stack gap={2}>
                                <Box>
                                    <Typography>Quantity</Typography>
                                    <TextField type="number" defaultValue={1} onChange={(e) => {
                                        setValue(+(e.target.value))
                                    }}></TextField>
                                </Box>
                                <Button variant="contained"
                                    aria-labelledby="addToCart"
                                    onClick={() => {
                                        if (user) {
                                            let imgChange = document.getElementById(`${products.id}${products.price}`) as HTMLImageElement
                                            const imgURL = imgChange.src
                                            let col = products.color.find((i: { img: string }) => {
                                                return i.img === imgURL
                                            })
                                            const color = col?.color
                                            dispatch(addToCart(
                                                {
                                                    idUser: user.id,
                                                    id: products.id,
                                                    title: products.title,
                                                    price: products.price,
                                                    categorie: products.categorie,
                                                    color: color,
                                                    qty: value,
                                                    img: imgURL
                                                }
                                            ))
                                            setAdd(true)
                                        }
                                        else {
                                            setSign(true)
                                        }
                                    }}
                                    sx={{ background: "var(--btn--main)", maxWidth: "300px", "&:hover": { background: "var(--btn--hover)" } }}>
                                    ADD TO CART
                                </Button>
                            </Stack></> : <Skeleton variant="rectangular" width={"100%"} height={"400px"}></Skeleton>}
                    </Box>

                </Stack>
                <AlertSign handleCloseAdd={() => handleCloseAdd()} handleCloseSign={() => { handleCloseSign() }} addvalue={add} signValue={sign}></AlertSign>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={valueTap}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Product Reviews" value="1" />
                                <Tab label="Privacy policy" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><Reviews /> </TabPanel>
                        <TabPanel value="2">
                            <Typography color={"var(--txt--second)"}>
                                Shipping cost is based on weight. Just add products to your cart and use the Shipping Calculator to see the shipping price.
                            </Typography>
                            <Typography color={"var(--txt--second)"}>
                                We want you to be 100% satisfied with your purchase. Items can be returned or exchanged within 30 days of delivery.
                            </Typography>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </>
    )
}
