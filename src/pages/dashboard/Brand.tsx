import { GridToolbar } from '@mui/x-data-grid';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../../rtk/Store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Title from '../../component/Title';
import { IconButton, Stack } from '@mui/material';
import { DeleteForever, Edit } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {
    Box,
    Button,
    CircularProgress,
} from "@mui/material";
import { green } from '@mui/material/colors';
import { fetchBrands } from '../../rtk/Slices/BrandSlice';
import SubTitle from '../../component/SubTitle';
import { useState } from "react";

import {
    Alert,
    Snackbar,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';

export default function Brand() {

    const [openADD, setOpenADD] = React.useState<boolean>(false);
    const [ID, setId] = useState()
    const [img, setImg] = useState("");
    const [errorImg, seterrorImg] = useState(false)
    const [success] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [load, setLoading] = useState(false)
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const [action, setAction] = useState("")

    const handleClose = () => {
        setOpen(false);
    };

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
    React.useEffect(() => {
        dispatch(fetchBrands());
    }, []);
    const Brand = selector((state) => {
        return state.BrandSlice.Brand;
    });
    const loading = selector((state) => {
        return state.BrandSlice.loading;
    });
    const columns: GridColDef[] = [
        { field: "id", headerName: 'ID', minWidth: 110, flex: 1 },
        {
            field: 'img',
            headerName: 'BRAND',
            minWidth: 230,
            flex: 1,
            sortable: false,

            headerAlign: "center",
            align: "center",
            renderCell: ({ row: img }) => {
                return (
                    <img src={img.img} alt='' width={"100%"} height={"100%"}></img>
                )
            }
        },
        {
            field: 'actions',
            headerName: 'ACTIONS',
            minWidth: 130,
            flex: 1,
            align: 'center',
            sortable: false,
            headerAlign: "center",
            renderCell: ({ row: id, row: img }) => {
                return (
                    <Stack direction={"row"} gap={2} >
                        <Box sx={{ position: 'relative' }}>
                            <IconButton
                                sx={buttonSx}
                                type="submit"
                                disabled={load}
                                onClick={() => {
                                    setLoading(true)
                                    fetch(`https://isotechdata.onrender.com/brands/${id.id}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    })
                                        .then((res) => res.json()).then(() => { dispatch(fetchBrands()) }).then(() =>
                                            loading && setLoading(false)
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
                        <IconButton onClick={() => {
                            setImg(img.img)
                            setOpenADD(true)
                            setAction("edit")
                            setId(id.id)
                        }}><Edit /> </IconButton>
                    </Stack>
                );
            },
        },
    ];

    const rows = [
        Brand.map((p, index) => {
            return {
                id: p.id,
                img: p.img,
            }
        })

    ];
    return (
        <>
            <Title title='BRANDS' />
            <Box sx={{ height: "max-content", width: '100%' }}>
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
                <Button sx={{ mb: "40px", mt: "15px" }} variant='contained' onClick={() => {
                    setOpenADD(true)
                    setImg("")
                    seterrorImg(false)
                    setAction("add")

                }
                }>ADD Brand</Button>
                <React.Fragment>

                    <Modal
                        open={openADD}
                        sx={{ minHeight: "700px", overflow: "auto" }}
                        onClose={() => {
                            setOpenADD(false)
                        }}
                    >
                        <ModalDialog size="lg" sx={{ width: "370px", height: "1900px", overflow: "auto" }} >
                            <ModalClose onClick={() => setOpenADD(false)}
                            />

                            <SubTitle title={action.toUpperCase() + ` BRAND`} my={2} />
                            <Stack gap={2}>
                                <Box maxWidth={"350px"} height={"350px"} border={"1px solid"} p={"3px"} mb={"3px"}>
                                    <img src={img} alt="mainImg" style={{ width: "100%", height: "350px" }} />
                                </Box>
                                <Button id="inputFile1" component="label"
                                    fullWidth
                                    variant="contained" startIcon={<CloudUploadIcon />} sx={{ height: "57px", maxWidth: "350px" }} >
                                    Upload  Image
                                    <VisuallyHiddenInput type="file" onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(e.target.files[0]);
                                            reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
                                                if (readerEvent?.target?.result) {
                                                    setImg(readerEvent.target.result.toString())
                                                }
                                            };
                                        }
                                    }} />
                                </Button>
                                {errorImg && <Alert severity="error">This is required.</Alert>}


                                <Stack direction={"row"} gap={2}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                        <Box sx={{ position: 'relative' }}>
                                            <Button
                                                variant="contained"
                                                sx={buttonSx}
                                                type="submit"
                                                disabled={load}
                                                onClick={() => {
                                                    if (img === "") {
                                                        seterrorImg(true)
                                                    }
                                                    else {
                                                        seterrorImg(false)
                                                        setLoading(true)
                                                        action === "add" && fetch(`https://isotechdata.onrender.com/brands`, {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                            body: JSON.stringify({
                                                                id: Date.now(),
                                                                img,

                                                            }),
                                                        })
                                                            .then((res) => res.json())
                                                            .then(() => dispatch(fetchBrands())).then((() => {
                                                                setLoading(false)
                                                                setOpen(true)
                                                                setOpenADD(false)
                                                            }))
                                                        action === "edit" && fetch(`https://isotechdata.onrender.com/brands/${ID}`, {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                            body: JSON.stringify({
                                                                id: ID,
                                                                img,

                                                            }),
                                                        })
                                                            .then((res) => res.json())
                                                            .then(() => dispatch(fetchBrands())).then((() => {
                                                                setLoading(false)
                                                                setOpen(true)
                                                                setOpenADD(false)
                                                            }))
                                                    }

                                                }}>
                                                {action.toUpperCase()} Brand
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
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={(e) => {
                                            setOpenADD(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>

                                </Stack>
                            </Stack>

                        </ModalDialog>
                    </Modal>

                </React.Fragment>

                <Snackbar open={open} onClose={handleClose} sx={{ width: '500px' }} autoHideDuration={2000}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        the brand has been {action}ed successfully!
                    </Alert>
                </Snackbar>
            </Box></>
    );
}