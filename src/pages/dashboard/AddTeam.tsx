import Title from "../../component/Title";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { green } from '@mui/material/colors';

import {
    Box,
    Button,
    CircularProgress,
    Alert,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../rtk/Slices/ProductSlice";
import { AppDispatch } from "../../rtk/Store";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from "react-hook-form";

export default function AddTeam() {
    const [open, setOpen] = React.useState(false);
    const [load, setLoading] = useState(false)
    const [success] = React.useState(false);
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [jopTitle, setjopTitle] = useState("");
    const [age, setAge] = useState("");
    const [img, setImg] = useState("");
    const dispatch = useDispatch<AppDispatch>()
    const [errorImg, seterrorImg] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleClose = () => {
        setOpen(false);
    };

    function addTeam() {
        if (img === "") {
        }
        else {
            seterrorImg(false)
            setLoading(true)
            fetch(`https://isotechdata.onrender.com/team`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: Date.now(),
                    name,
                    age,
                    jopTitle,
                    img,
                }),
            })
                .then((res) => res.json())
                .then(() => dispatch(fetchProducts())).then((() => {
                    setLoading(false)
                    setOpen(true)
                }))
        }

    }
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


    return (
        <>
            <Title title="Add Product" />
            <Stack direction={"row"} marginY={"50px"} gap={5} flexWrap={"wrap"}>
                <Box>
                    <Box width={"350px"} height={"350px"} border={"1px solid"} p={"3px"} mb={"3px"}>
                        <img src={img} alt="mainImg" style={{ width: "350px", height: "350px" }} />
                    </Box>
                    <Button id="inputFile1" component="label"
                        variant="contained" startIcon={<CloudUploadIcon />} sx={{ height: "57px", width: "100%" }} >
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
                </Box>
                <Box sx={{ width: "100%" }} component={"form"} onSubmit={handleSubmit((data) => {
                    addTeam()
                })
                }>
                    <TextField
                        {...register("name", { required: true })}

                        helperText={
                            errors.name && "this is required field"
                        }
                        error={Boolean(errors.name)}
                        fullWidth
                        label={"name".toUpperCase()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={name}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                    />
                    <TextField
                        {...register("jopTitle", { required: true })}

                        helperText={
                            errors.jopTitle && "this is required field"
                        }
                        error={Boolean(errors.jopTitle)}
                        fullWidth
                        label={"jop Title".toUpperCase()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={jopTitle}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setjopTitle(event.target.value);
                        }}
                        sx={{ mt: "15px" }}
                    />
                    <TextField
                        {...register("age", { required: true })}
                        helperText={
                            errors.age && "this is required field"
                        }
                        error={Boolean(errors.age)}
                        value={age}
                        sx={{ marginY: "15px" }}
                        fullWidth
                        label={"age".toUpperCase()}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAge(event.target.value);
                        }}
                    />
                    <Stack direction={"row"} gap={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <Box sx={{ position: 'relative' }}>
                                <Button
                                    variant="contained"
                                    sx={buttonSx}
                                    type="submit"
                                    disabled={load}
                                >
                                    Submit
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
                                navigate("../team");
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Stack>
            <Snackbar open={open} onClose={handleClose} sx={{ width: '500px' }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    the member has been added successfully!
                </Alert>
            </Snackbar>
        </>
    )
}