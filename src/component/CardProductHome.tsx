import * as React from 'react';
import { Container, Box, Tab, Tabs, Skeleton, Typography } from '@mui/material';
import SubTitle from './SubTitle';
import { AppDispatch, RootState } from '../rtk/Store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { fetchProductsTrending, fetchcategories } from '../rtk/Slices/ProductSlice';
import { Stack } from '@mui/material';
import { IconButton, Paper } from "@mui/material";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import AlertSign from "../component/Alert";
import { addToCart } from "../rtk/Slices/CartSlice";
import { addTowishList } from "../rtk/Slices/wishListSlice";
export default function CardProductsHome(props: {
    Categories: any;
    action2: any;
    loading: boolean, products: any
}) {
    const dispatch = useDispatch<AppDispatch>()
    const [value, setValue] = React.useState('ALL');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const selector: TypedUseSelectorHook<RootState> = useSelector

    React.useEffect(() => {
        dispatch(fetchProductsTrending());
        dispatch(fetchcategories());
    }, [dispatch]);
    const wish = selector((state) => {
        return state.wishListSlice.userItems;
    });

    const [add, setAdd] = React.useState(false)
    const [sign, setSign] = React.useState(false)
    function handleCloseAdd(): void {
        setAdd(false);
    };
    function handleCloseSign(): void {
        setSign(false);
    };
    const user = JSON.parse(localStorage.getItem('user')!)
    const StyledBadge = styled(Badge)<BadgeProps>(({ }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${"white"}`,
            padding: '0 4px',
            background: "var(--btn--main)",
            color: "white"
        },
    }));
    return (
        <Container>
            <SubTitle title='Trending Products' />
            <Box sx={{ width: '100%' }}>
                <Tabs
                    variant="scrollable"
                    scrollButtons
                    value={value}
                    onChange={handleChange}
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    <Tab value={"ALL"} label={"ALL"} onClick={(() => { dispatch(props.action2("all")) })} />
                    {props.Categories.map((c: { categorie: string }, index: number) => {
                        return (
                            <Tab key={index} value={c.categorie} label={c.categorie} onClick={(() => { dispatch(props.action2(c.categorie)) })} />

                        )
                    })}
                </Tabs>
                <Tabs
                    sx={{ my: "10px", alignItems: "center", textWrap: "wrap" }}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    value={0}
                    TabScrollButtonProps={{ style: { background: "var(--btn--main)", color: "white", height: "41px", borderRadius: "50%" } }}
                    TabIndicatorProps={{ style: { background: 'transparent' } }}        >
                    {(props.loading ? props.products : Array.from(new Array(6))).map((item: {
                        img: string; categorie: string, qty: number, id: (number | string), title: string, price: number | string, color: any
                    }, index: string | number) => (

                        <Paper key={index} sx={{ overflow: "hidden", mx: "5px", textWrap: "wrap", p: "10px", boxSizing: "content-box", minWidth: "200px", maxWidth: "201px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {
                                props.loading ? (
                                    <Link to={`../Shop/${item.id}/${item.title}`} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                        <img loading="lazy"
                                            id={`${item.id}${item.price}`}
                                            style={{ width: "100%", height: "200px" }}
                                            alt={item.title}
                                            src={item.color.length >= 1 ? item.color[0].img :
                                                item.img}
                                        />
                                    </Link>
                                ) : (
                                    <Skeleton variant="rectangular" width={"150px"} height={"200px"} />
                                )}
                            {props.loading ? (
                                <Stack sx={{ pr: 2 }} justifyContent={"space-between"} height={"100%"}>
                                    <Box>
                                        <Link to={`../Shop/${item.id}/${item.title}`}  >
                                            <Tab wrapped label={item.title} sx={{ padding: 0, textAlign: "left", fontWeight: "bold", fontSize: "13px", cursor: "pointer", "&:hover": { color: "var(--btn--main)" } }}></Tab>
                                        </Link>
                                        <Typography display="block" variant="caption" color="var(--txt--second)" fontWeight={"bold"} fontSize={"14px"}>
                                            ${item.price}
                                        </Typography>
                                        {item.color ? <Stack gap={1} flexDirection={"row"} my={"10px"}>
                                            {(item.color.length !== 0) ? item.color.map((i: { color: string }, index: number) => (
                                                <Box
                                                    key={index}
                                                    onClick={((e) => {
                                                        const { target } = e;
                                                        if (target instanceof HTMLElement) {
                                                            let imgChange = document.getElementById(`${item.id}${item.price}`) as HTMLImageElement
                                                            let img2 = item.color.find((i: { color: string }) => {
                                                                return i.color === target.classList[0]
                                                            })
                                                            imgChange.src = img2.img
                                                        }
                                                    })}
                                                    className={i.color}
                                                    sx={{ backgroundColor: `${i.color}`, cursor: "pointer" }} borderRadius={"50%"} width={"20px"} height={"20px"} border={"1px solid black"} >
                                                </Box>
                                            )) : <></>}
                                        </Stack> : <></>}
                                    </Box>
                                    <Stack flexDirection={"row"} gap={1}>
                                        <IconButton
                                            aria-labelledby="addToCart"
                                            onClick={() => {
                                                if (user) {
                                                    let imgChange = document.getElementById(`${item.id}${item.price}`) as HTMLImageElement
                                                    const imgURL = imgChange.src
                                                    let col = item.color.find((i: { img: string }) => {
                                                        return i.img === imgURL
                                                    })
                                                    const color = col === undefined ? [] : col.color
                                                    dispatch(addToCart(
                                                        {
                                                            idUser: user.id,
                                                            id: item.id,
                                                            title: item.title,
                                                            price: item.price,
                                                            categorie: item.categorie,
                                                            color: color,
                                                            qty: item.qty,
                                                            img: imgURL
                                                        }
                                                    ))
                                                    setAdd(true)
                                                }
                                                else {
                                                    setSign(true)
                                                }
                                            }}
                                            aria-label="cart" sx={{ background: "var(--btn--hover)", borderRadius: "3px", "&:hover": { background: "var(--btn--main)" } }}>
                                            <StyledBadge badgeContent={"+"}>
                                                <ShoppingCart sx={{ color: "white" }} />
                                            </StyledBadge>
                                        </IconButton>
                                        <IconButton
                                            aria-labelledby="addToWishList"
                                            onClick={() => {
                                                if (user) {
                                                    let imgChange = document.getElementById(`${item.id}${item.price}`) as HTMLImageElement
                                                    const imgURL = imgChange.src
                                                    let col = item.color.find((i: { img: string }) => {
                                                        return i.img === imgURL
                                                    })
                                                    const color = col.color
                                                    dispatch(addTowishList(
                                                        {
                                                            idUser: user.id,
                                                            id: item.id,
                                                            title: item.title,
                                                            price: item.price,
                                                            categorie: item.categorie,
                                                            color: color,
                                                            qty: item.qty,
                                                            img: imgURL
                                                        }
                                                    ))
                                                }
                                                else {
                                                    setSign(true)
                                                }
                                            }}
                                            aria-label="cart" sx={{ background: "var(--btn--hover)", borderRadius: "3px", "&:hover": { background: "var(--btn--main)" } }}>
                                            <StyledBadge badgeContent={"+"}>
                                                <Favorite sx={{
                                                    color: wish.find((i) => {
                                                        return +item.id === +i.id
                                                    }) ? "red" : "white"
                                                }} />
                                            </StyledBadge>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            ) : (
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </Box>
                            )}
                        </Paper>
                        // 
                    ))}
                    <AlertSign handleCloseAdd={() => handleCloseAdd()} handleCloseSign={() => { handleCloseSign() }} addvalue={add} signValue={sign}></AlertSign>
                </Tabs>
            </Box>
        </Container>
    )
}