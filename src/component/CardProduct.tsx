import { Box, IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchcategories } from "../rtk/Slices/ProductSlice";
import { AppDispatch, RootState } from "../rtk/Store";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import AlertSign from "../component/Alert";
import { addToCart } from "../rtk/Slices/CartSlice";
import { addTowishList } from "../rtk/Slices/wishListSlice";
export default function CardProducts(props: {
    loading: boolean; products: {
        id: string | number;
        title: string;
        price: string;
        categorie: string;
        qty: string | number;
        color: {
            img: string;
            color: string;
        }[];
        img: string | undefined
    }[]; justifyXs?: string, justifySm?: string
}) {
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const wish = selector((state) => {
        return state.wishListSlice.userItems;
    });
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchcategories());
    }, []);
    const [add, setAdd] = useState(false)
    const [sign, setSign] = useState(false)
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
        <Stack width={"400px"} flexGrow={3} flexDirection={"row"} gap={3} flexWrap={"wrap"} justifyContent={{ xs: props.justifyXs, sm: props.justifyXs, md: props.justifySm }}>
            {(props.loading ? props.products : Array.from(new Array(6))).map((item: {
                img: string; categorie: string, qty: number, id: (number | string), title: string, price: number | string, color: any
            }, index: string | number) => (
                <Paper key={index} sx={{ p: "10px", boxSizing: "border-box", width: "150px", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                        <Box sx={{ pr: 2 }}>
                            <Link to={`../Shop/${item.id}/${item.title}`}>
                                <Typography gutterBottom variant="body2" fontWeight={"bold"} sx={{ cursor: "pointer", "&:hover": { color: "var(--btn--main)", fontSize: "14.5px" } }}>
                                    {item.title}
                                </Typography>
                            </Link>
                            <Typography display="block" variant="caption" color="var(--txt--second)" fontWeight={"bold"} fontSize={"14px"}>
                                ${item.price}
                            </Typography>
                            {item.color ? <Stack gap={1} flexDirection={"row"} my={"10px"}>
                                {(item.color.length != 0) ? item.color.map((i: { color: string }, index: number) => (
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
                            <Stack flexDirection={"row"} gap={1}>
                                <IconButton
                                    onClick={() => {
                                        if (user) {
                                            let imgChange = document.getElementById(`${item.id}${item.price}`) as HTMLImageElement
                                            const imgURL = imgChange.src
                                            let col = item.color.find((i: { img: string }) => {
                                                return i.img === imgURL
                                            })
                                            console.log(item.qty)
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
                        </Box>
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

        </Stack>
    )
}