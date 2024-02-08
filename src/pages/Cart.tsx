import Title from "../component/Title";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import { RootState } from "../rtk/Store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { clear, deleteFromCart, updateQty } from "../rtk/Slices/CartSlice";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
interface Row {
    PRODUCT: string;
    QUANTITY: number;
    TOTAL: number;
    id: number | string;
    img: string;
    PRICE: number
}
export default function Cart() {
    const dispatch = useDispatch()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const items = selector((state) => {
        return state.CartSlice.userItems;
    });
    const total = items.reduce((acc, product) => {
        acc += +product.price * product.qty;
        return acc;
    }, 0);
    const rows: (Row)[] =
        items.map((i) => {
            return {
                PRODUCT: i.title,
                QUANTITY: i.qty,
                PRICE: +(i.price),
                TOTAL: +(i.price) * i.qty,
                id: i.id,
                img: i.img
            }
        })
    return <>
        <Title title="Your Shopping Cart" />
        <Container>
            {items.length !== 0 ? (<><TableContainer component={Paper} sx={{ my: "40px", py: "20px" }}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>PRODUCT</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>IMG</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>QUANTITY</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>PRICE</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>TOTAL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.PRODUCT}</TableCell>
                                <TableCell><img loading="lazy" style={{ width: "120px", height: "130px" }} alt="" src={row.img}></img></TableCell>
                                <TableCell width={"120px"}>
                                    <Stack flexDirection={"row"}>
                                        <TextField type="number" id={`${row.id}-${row.img}`} defaultValue={row.QUANTITY} onChange={(event) => {
                                            if (+event.target.value <= 0) {
                                                dispatch(deleteFromCart(row));
                                            }
                                            else {
                                                dispatch(updateQty(row));
                                            }
                                        }}>
                                        </TextField>
                                        <IconButton aria-labelledby="deleteFromCart" onClick={(() => {
                                            dispatch(deleteFromCart(row));
                                        })}>
                                            <DeleteOutline sx={{ my: "auto", cursor: "pointer", "&:hover": { color: "red" } }} />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">{row.PRICE}$ </TableCell>
                                <TableCell align="right">{row.TOTAL}$ </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>{total}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>TAX</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>70$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>Total</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>{total + 70}$</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer><Button
                aria-labelledby="clear"
                onClick={(() => {
                    dispatch(clear());
                })}
                variant="contained" sx={{ width: "25%", mb: "20px", background: "var(--btn--main)", "&:hover": { background: "var(--btn--hover)" } }}>
                    CLEAR
                </Button></>) : (<Stack my={"40px"} textAlign={"center"} gap={3}>
                    <Typography variant="h6">
                        Your Shopping Cart Is Empity
                    </Typography>
                    <Link to={"../shop"}>
                        <Typography variant="h6" sx={{ "&:hover": { color: "var(--btn--main)" }, textDecoration: "underline" }}>
                            Go To Shopping
                        </Typography>
                    </Link>

                </Stack>)}
        </Container>

    </>
}