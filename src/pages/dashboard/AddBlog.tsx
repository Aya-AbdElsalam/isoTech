import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-quill"
import Title from '../../component/Title';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
// import ImageResize from 'quill-image-resize-module-react';

// Quill.register('modules/imageResize', ImageResize);
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
Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);
export default function AddBlog() {
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
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [img, setImg] = useState("");
    const dispatch = useDispatch<AppDispatch>()
    const [errorImg, seterrorImg] = useState(false)
    const [errorTxt, seterrorTxt] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleClose = () => {
        setOpen(false);
    };
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
    const [value, setValue] = useState('');
    function addBlog() {
        if (img === "") {
            seterrorImg(true)
        }
        else if (value === "") {
            seterrorTxt(true)
        }
        else {
            seterrorImg(false)
            setLoading(true)
            fetch(`https://isotechdata.onrender.com/Blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: Date.now(),
                    title,
                    value,
                    date: `${["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ][(new Date()).getMonth()]} ${(new Date()).getUTCDate()}, ${(new Date()).getUTCFullYear()}`,
                    description,
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
    return (
        <>
            <Title title='ADD NEW BLOG' />
            <Box sx={{ width: "100%" }} component={"form"} onSubmit={handleSubmit((data) => {
                addBlog()
            })
            }>
                <Stack gap={3} mb={5}>
                    <Box>
                        <Box width={"350px"} height={"350px"} border={"1px solid"} p={"3px"} mb={"3px"}>
                            <img src={img} alt="mainImg" style={{ width: "350px", height: "350px" }} />
                        </Box>
                        <Button id="inputFile1" component="label"
                            variant="contained" startIcon={<CloudUploadIcon />} sx={{ height: "57px", width: "350px" }} >
                            Upload  Article's Image
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
                    <TextField
                        {...register("title", { required: true })}
                        helperText={
                            errors.title && "this is required field"
                        }
                        error={Boolean(errors.title)}
                        fullWidth
                        label={"title".toUpperCase()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={title}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTitle(event.target.value);
                        }}
                    />
                    <TextField
                        {...register("description", { required: true })}
                        helperText={
                            errors.description && "this is required field"
                        }
                        error={Boolean(errors.description)}
                        fullWidth
                        label={"description".toUpperCase()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={description}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setdescription(event.target.value);
                        }}
                        sx={{ mt: "15px" }}
                    />
                    <ReactQuill theme="snow" value={value} onChange={setValue}
                        modules={AddBlog.modules}
                        style={{ height: "500px", marginBottom: "90px" }}
                        formats={AddBlog.formats}
                    />
                    {errorTxt && <Alert severity="error">This is required.</Alert>}
                    <Stack direction={"row"} gap={2} >
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
                                // navigate("../team");
                            }}
                        >
                            Cancel
                        </Button>

                    </Stack>
                </Stack>
            </Box>

            <Snackbar open={open} onClose={handleClose} sx={{ width: '500px' }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    the blog has been added successfully!
                </Alert>
            </Snackbar>
        </>
    )
}
AddBlog.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ["link", "image", "video", "formula"],
        ['clean']                                         // remove formatting button
    ],
    imageActions: {

    },
    imageFormats: {

    },
};
AddBlog.formats = [
    "height",
    "link",
    "placeholder",
    "calltoaction",
    "width",
    'align',
    'float',
    "color",
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block",
    "formula"
]
