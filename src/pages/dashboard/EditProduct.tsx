import Title from "../../component/Title";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { green } from '@mui/material/colors';
import {
    Box,
    Button,
    FilledTextFieldProps,
    CircularProgress,
    Skeleton,
    Alert,
    Snackbar,
    OutlinedTextFieldProps,
    Stack,
    StandardTextFieldProps,
    TextField,
    TextFieldVariants,
} from "@mui/material";
import { c } from "../../Data/Color";
import { CancelPresentationOutlined, ColorLens } from "@mui/icons-material";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchcategories } from "../../rtk/Slices/ProductSlice";
import { AppDispatch, RootState } from "../../rtk/Store";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Autocomplete } from "@mui/material";
import { JSX } from "react/jsx-runtime";
import { IconButton, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
export default function EditProduct() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(false)
    const [load, setLoading] = useState(false)
    const [main, setMain] = useState(false)
    const {
        handleSubmit,
    } = useForm();
    const params = useParams()

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
    const [title, settitle] = useState("");
    const [price, setprice] = useState("");
    const [categorie, setcategorie] = useState("");
    var colorArr: {
        img: string,
        color: string
    }[];
    var setColorArr: Dispatch<SetStateAction<any>> = () => { }
    [colorArr, setColorArr] = useState([])
    const [color, setColor] = useState<string[]>([])
    const [img, setImg] = useState<{
        id: number,
        img: string
    }[]>([])
    const [imgTxt, setImgTxt] = useState<{
        id: number,
        img: string
    }[]>([])
    const [mainImg, setMainImg] = useState<string | undefined>()
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const Categories = selector((state) => {
        return state.ProductSlice.categories;
    });

    const [loadingProduct, setLoadingProduct] = useState(false)
    useEffect(() => {
        dispatch(fetchcategories());
        fetch(`https://isotechdata.onrender.com/Products/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                const id = Date.now();
                var arr: string[] = [];
                if (data.color && data.color.length !== 0) {
                    setColor(color.concat(data.color.map((i: { color: string; }) => {
                        return i.color
                    })))
                    setImg(img.concat(data.color.map((i: { img: string; }, index: number) => {
                        return { id: id + index, img: i.img }
                    })))
                    arr = arr.concat(data.color.map((i: { color: string; }) => {
                        return i.color
                    }))
                }


                setImgTxt(arr.map((i, index) => {

                    return { id: id + index, img: `img ${arr[index]}` }
                }))
                setcategorie(data.categorie)
                settitle(data.title)
                setprice(data.price)
                setMainImg(data?.img)
            }).then(() => setLoadingProduct(true))
    }, []);


    const handleClose = () => {
        setOpen(false);
    };

    function editProduct() {
        if (img.length !== color.length) {
            setError(true)
        }
        else if (mainImg == null) {
            setMain(true)
        }
        else if (title.length === 0 || categorie.length === 0 || price.length === 0 || color.length === 0 || img.length === 0 || imgTxt.length === 0 || mainImg.length === 0) {
        }
        else {
            img.forEach((i, index) => {
                setColorArr(colorArr.push({
                    img: i.img,
                    color: color[index]
                }))
            })
            setLoading(true)
            fetch(`https://isotechdata.onrender.com/Products/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: params.id,
                    title,
                    price,
                    categorie,
                    qty: 1,
                    color: colorArr,
                    img: mainImg,
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
            <Title title="Edit Product" />
            <Stack direction={"row"} marginY={"50px"} gap={5} flexWrap={"wrap"}>
                <Box>
                    <Box width={"350px"} height={"350px"} border={"1px solid"} p={"3px"} mb={"3px"}>
                        {loadingProduct ? <img src={mainImg} alt="mainImg" style={{ width: "350px", height: "350px" }} /> : (
                            <Skeleton variant="rectangular" width={"350px"} height={"350px"} />
                        )}
                    </Box>
                    {loadingProduct ? <Button id="inputFile1" component="label"
                        aria-labelledby="upload"
                        variant="contained" startIcon={<CloudUploadIcon />} sx={{ height: "57px", width: "100%" }} >
                        Upload Default Image
                        <VisuallyHiddenInput type="file" onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
                                    if (readerEvent?.target?.result) {
                                        setMainImg(readerEvent.target.result.toString())
                                        setMain(false)
                                    }
                                };
                            }
                        }} />
                    </Button> : (
                        <Skeleton variant="rectangular" width={350} height={50} sx={{ mt: "5px" }} />
                    )}
                    {main && <Alert severity="error">This is required.</Alert>}
                </Box>
                <Box sx={{ width: "100%" }} component={"form"} onSubmit={handleSubmit((data) => {
                    editProduct()
                })
                }>
                    {loadingProduct ? (<> <TextField
                        helperText={
                            title.length === 0 && "this is required field"
                        }
                        error={title.length === 0}
                        fullWidth
                        label={"title".toUpperCase()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={title}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settitle(event.target.value);
                        }}

                    />

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            sx={{ marginY: "15px" }}
                            options={Categories.map((i) => {
                                return i.categorie
                            })}
                            value={categorie}
                            renderInput={(params) =>
                                <TextField
                                    value={categorie}
                                    helperText={
                                        categorie.length === 0 && "this is required field"
                                    }
                                    error={Boolean(categorie.length === 0)}
                                    {...params}
                                    label={`Categorie`.toUpperCase()}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            }
                            onInputChange={(event, newInputValue) => {
                                setcategorie(newInputValue);
                            }}
                        />
                        <TextField
                            helperText={
                                price.length === 0 && "this is required field"
                            }
                            value={price}

                            error={Boolean(price.length === 0)}
                            sx={{ marginY: "15px" }}
                            fullWidth
                            label={"price".toUpperCase()}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setprice(event.target.value);
                            }}
                        />

                        <Stack direction={"row"} gap={2} sx={{ marginY: "15px" }}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                value={color}
                                popupIcon={<ColorLens />}
                                sx={{ minWidth: "200px" }}
                                options={c}
                                getOptionLabel={(option) => option}
                                filterSelectedOptions
                                onChange={(event, newValue: string[]) => {
                                    setError(false)

                                    setColor(newValue)
                                }}

                                renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => (
                                    <TextField

                                        helperText={
                                            color.length === 0 && "this is required field"
                                        }
                                        error={Boolean(color.length === 0)}
                                        {...params}
                                        label="COLOR"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                )}
                            />
                            <Box sx={{ flexGrow: "1" }}>
                                <Button id="inputFile1" component="label"
                                    aria-labelledby="upload"
                                    variant="contained" startIcon={<CloudUploadIcon />} sx={{ height: "57px", width: "100%" }} >
                                    Upload image
                                    <VisuallyHiddenInput type="file" onChange={(e) => {
                                        setError(false)
                                        var date = Date.now()
                                        if (e.target.files && e.target.files[0]) {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(e.target.files[0]);
                                            reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
                                                if (readerEvent?.target?.result) {
                                                    setImg(img.concat({
                                                        id: date,
                                                        img: readerEvent.target.result.toString()
                                                    }))
                                                }
                                            };
                                        }
                                        setImgTxt(imgTxt.concat({
                                            id: date,
                                            img: `${e.target.value.substring(0, 20)}${e.target.value.length > 20 ? "..." : ""}`
                                        }))

                                    }} />
                                </Button>
                                <Box id="2345">
                                    {imgTxt?.map((i) => {
                                        return (
                                            <Typography display={"inline-block"} fontSize={"14px"} sx={{ display: "inline-flex", alignItems: "center" }}>
                                                {i.img} <IconButton
                                                    aria-labelledby="img"
                                                    onClick={() => {
                                                        setImgTxt(imgTxt.filter((img) => {
                                                            return img.id !== i.id
                                                        }))
                                                        setImg(img.filter((img) => {
                                                            return img.id !== i.id
                                                        }))
                                                    }}><CancelPresentationOutlined sx={{ fontSize: "14px" }} /></IconButton>
                                            </Typography>
                                        )
                                    })}

                                </Box></Box>
                        </Stack>
                        {error && <Alert severity="error">number of image not equal number of color</Alert>}
                        <Stack mt={"10px"} direction={"row"} gap={2} justifyContent={"center"} borderTop={"1px solid"} borderBottom={"1px solid"} mb={"20px"}>
                            <Box width={"120px"} >
                                <Typography fontSize={"17px"} fontWeight={"bold"}>Color</Typography>
                                {color.length >= 1 && color.map((i) => {
                                    return (
                                        <Typography fontSize={"14px"} sx={{ alignItems: "center" }}>
                                            {i}
                                        </Typography>
                                    )
                                })}
                            </Box>
                            <Box width={"150px"}>
                                <Typography fontSize={"17px"} fontWeight={"bold"}>Img</Typography>
                                {imgTxt?.map((i: { img: string | undefined; }) => {
                                    return (
                                        <Typography fontSize={"14px"} sx={{ alignItems: "center" }}>
                                            {i.img}
                                        </Typography>
                                    )
                                })}
                            </Box>
                        </Stack>
                        <Stack direction={"row"} gap={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                <Box sx={{ position: 'relative' }}>
                                    <Button
                                        aria-labelledby="submit"
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
                                aria-labelledby="cancel"
                                variant="outlined"
                                color="error"
                                onClick={(e) => {
                                    navigate("../products");
                                }}
                            >
                                Cancel
                            </Button>

                        </Stack></>) : (
                        <Box sx={{ width: "100%" }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    )}
                </Box>

            </Stack>
            <Snackbar open={open} onClose={handleClose} sx={{ width: '500px' }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This product has been edited successfully!
                </Alert>
            </Snackbar>
        </>
    )
}