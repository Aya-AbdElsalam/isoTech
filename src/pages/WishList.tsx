import Title from "../component/Title";
import { RootState } from "../rtk/Store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Paper, TableRow, Alert, Button, Container, IconButton, Snackbar, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, } from "@mui/material";
import { addToCart } from "../rtk/Slices/CartSlice";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { clearWishList, deleteFromwishList } from "../rtk/Slices/wishListSlice";
import { useState } from "react";
interface Row {
    title: string;
    qty: number;
    id: number | string;
    img: string;
    price: number;
    idUser: number | string,
    categorie: string;
    color: [{ color: string; img: string; }]
}
export default function WishList() {
    const dispatch = useDispatch()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const items = selector((state) => {
        return state.wishListSlice.userItems;
    });
    const [add, setAdd] = useState(false)

    const rows: (Row)[] =
        items.map((i) => {
            return {
                idUser: JSON.parse(localStorage.getItem("user")!).id,
                categorie: i.categorie,
                color: i.color,
                qty: i.qty,
                title: i.title,
                price: +(i.price),
                id: i.id,
                img: i.img
            }
        })
    return <>
        <Title title="Your Wish List" />

        <Container>
            {items.length !== 0 ? (<><TableContainer component={Paper} sx={{ my: "40px", py: "20px" }}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table" >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>PRODUCT</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>IMG</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>PRICE</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">ACTIONS</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell><img loading="lazy" style={{ width: "120px", height: "130px" }} alt="" src={row.img}></img></TableCell>

                                <TableCell >{row.price}$ </TableCell>
                                <TableCell >
                                    <Stack flexDirection={"row"} justifyContent={"center"}>
                                        <IconButton aria-labelledby="deleteFromWishList" onClick={() => { dispatch(deleteFromwishList(row)) }}>
                                            <DeleteOutline sx={{ my: "auto", cursor: "pointer", "&:hover": { color: "red" } }} />
                                        </IconButton>
                                        <Button variant="contained"
                                            aria-labelledby="addToCart"
                                            onClick={(() => {
                                                dispatch(addToCart(
                                                    row
                                                ))
                                                setAdd(true)
                                            })}
                                            sx={{ background: "var(--btn--main)", "&:hover": { background: "var(--btn--hover)" } }}>
                                            ADD TO CART
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><Button
                aria-labelledby="clear"
                onClick={(() => {
                    dispatch(clearWishList());
                })}
                variant="contained" sx={{ width: "25%", mb: "20px", background: "var(--btn--main)", "&:hover": { background: "var(--btn--hover)" } }}>
                    CLEAR
                </Button></>) : (<Stack my={"40px"} textAlign={"center"} gap={3}>
                    <Typography variant="h6">
                        Your Wish List Is Empity
                    </Typography>
                    <Link to={"../shop"}>
                        <Typography variant="h6" sx={{ "&:hover": { color: "var(--btn--main)" }, textDecoration: "underline" }}>
                            Go To Shopping
                        </Typography>
                    </Link>

                </Stack>)}
            <Snackbar open={add} autoHideDuration={3000} onClose={() => { setAdd(false) }}>
                <Alert
                    onClose={() => { setAdd(false) }}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    The item has been add to cart
                </Alert>

            </Snackbar>
        </Container>

    </>
}