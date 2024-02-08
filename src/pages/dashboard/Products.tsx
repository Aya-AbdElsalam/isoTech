import { GridToolbar } from '@mui/x-data-grid';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchProducts } from '../../rtk/Slices/ProductSlice';
import { AppDispatch, RootState } from '../../rtk/Store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Title from '../../component/Title';
import { IconButton, Stack } from '@mui/joy';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Autocomplete,
    Button,
    CircularProgress,
    TextField,
} from "@mui/material";
import { green } from '@mui/material/colors';
export default function Products() {
    const [success] = React.useState(false);
    const [load, setLoading] = React.useState(false)

    const buttonSx = {
        fontSize: "12px",
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const navigate = useNavigate()
    React.useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    const products = selector((state) => {
        return state.ProductSlice.product;
    });
    const loading = selector((state) => {
        return state.ProductSlice.loading;
    });
    const columns: GridColDef[] = [
        { field: "id", headerName: 'ID', width: 60 },
        {
            field: 'title',
            headerName: 'TITLE',
            width: 400,
        },
        {
            field: 'price',
            headerName: 'PRICE',
            width: 80,
        },
        {
            field: 'categorie',
            headerName: 'CATEGORIE',
            width: 110,

        },
        {
            field: 'color',
            headerName: 'COLOR',
            width: 320,
            editable: false,
            renderCell: ({ row: color, row: id, row: title, row: price, row: categorie, row: qty, row: img }) => {
                return (
                    <Box

                    >
                        <Stack direction={"row"} gap={2}>
                            <Autocomplete
                                autoComplete
                                includeInputInList
                                clearOnEscape
                                id={`${id.id}/${title.title}`}
                                options={color.color.map((i: { color: string; }) => {
                                    return i.color
                                })}
                                sx={{ width: "140px" }}
                                renderInput={(params) => <TextField {...params} label="color" />}

                            />
                            <Box sx={{ position: 'relative' }}>
                                <Button
                                    sx={buttonSx}
                                    type="submit"
                                    variant='contained' color='error'
                                    aria-labelledby="submit"
                                    disabled={load}
                                    onClick={(() => {
                                        setLoading(true)
                                        let i = document.getElementById(`${id.id}/${title.title}`) as HTMLInputElement
                                        let c = color.color.filter((color: { color: string; }) => {
                                            return color.color !== i.value
                                        })
                                        fetch(`https://isotechdata.onrender.com/Products/${id.id}`, {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                id: id.id,
                                                qty: qty.qty,
                                                title: title.title,
                                                price: price.price,
                                                categorie: categorie.categorie,
                                                color: c,
                                                img: img.img
                                            }),
                                        })
                                            .then((res) => res.json()).then(() => { dispatch(fetchProducts()) }).then(() => {
                                                loading === true && setTimeout(() => {
                                                    setLoading(false)
                                                }, 3000)

                                                i.value = ""
                                            })

                                    })}>Remove this color

                                </Button>
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

                        </Stack>

                    </Box>

                );
            },

        },
        {
            field: 'actions',
            headerName: 'ACTIONS',
            width: 110,
            renderCell: ({ row: id }) => {
                return (

                    <Stack direction={"row"} gap={2}>

                        <Box sx={{ position: 'relative' }}>
                            <IconButton
                                sx={buttonSx}
                                aria-labelledby="submit"
                                type="submit"
                                disabled={load}
                                onClick={() => {
                                    setLoading(true)
                                    fetch(`https://isotechdata.onrender.com/Products/${id.id}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },

                                    })
                                        .then((res) => res.json()).then(() => { dispatch(fetchProducts()) }).then(() => setTimeout(() => {
                                            loading && setLoading(false)
                                        }, 4000))
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

                        <IconButton aria-labelledby="edit" onClick={() => {
                            navigate(`../products/edit/${id.id}`)
                        }}><Edit /> </IconButton>

                    </Stack>


                );
            },
        },
    ];

    const rows = [
        products.map((p, index) => {
            return {
                id: p.id,
                title: p.title,
                price: p.price,
                categorie: p.categorie,
                color: p.color,
                qty: p.qty,
                img: p.img
            }
        })

    ];
    return (
        <><Title title='PRODUCTS' /><Box sx={{ height: "max-content", width: '100%' }}>
            <DataGrid
                density='comfortable'
                slots={{ toolbar: GridToolbar }}
                rows={loading ? rows[0] : []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                sx={{ mt: "50px" }}
                pageSizeOptions={[8]}
                disableRowSelectionOnClick />
            <Link to="addProduct">
                <Button aria-labelledby="add" sx={{ mb: "40px", mt: "15px" }} variant='contained' >ADD PRODUCT</Button>
            </Link>
        </Box></>
    );
}