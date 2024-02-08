import { Alert, Box, Button, Container, List, Paper, Snackbar, Stack, TextField, Typography, SnackbarOrigin } from "@mui/material";
import Title from "../component/Title";
import SubTitle from "../component/SubTitle";
import { ListLocation } from "../component/LocationComponent"
import { useForm } from "react-hook-form";
import { ListItem } from "@mui/joy";
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import "react-quill"
import { green } from '@mui/material/colors';
import { CircularProgress, } from "@mui/material";
interface State extends SnackbarOrigin {
    open: boolean;
}
export default function ContactUs() {
    const [open, setState] = React.useState(false);
    // const { vertical, horizontal, open } = state;
    const handleClose = () => {
        setState(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [comment, setComment] = useState("")
    const [email, setEmail] = useState("")
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

    return (
        <>
            <Title title="Contact" />
            <Container sx={{ mb: "80px" }}>
                <SubTitle title="Get in touch" left="41%" txt={"center"} />
                <Stack flexWrap={"wrap"} flexDirection={"row"} >
                    <Box width={"400px"} flexGrow={2} >
                        <Paper sx={{ padding: "40px" }}>
                            <Box component={"form"} onSubmit={handleSubmit((data) => {
                                setLoading(true)

                                fetch(`https://isotechdata.onrender.com/mail`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        id: Date.now(),
                                        date: `${["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"
                                        ][(new Date()).getMonth()]} ${(new Date()).getUTCDate()}, ${(new Date()).getUTCFullYear()}`,
                                        email,

                                        phone,
                                        comment,
                                        name,
                                        idUser: JSON.parse(localStorage.getItem("user")!) ? JSON.parse(localStorage.getItem("user")!).id : Date.now()
                                    })
                                })
                                    .then((res) => res.json()).then((r) => {
                                        setState(true);
                                        setLoading(false)
                                    })
                            })
                            }>
                                <TextField
                                    {...register("Name", { required: true, minLength: 3 })}
                                    helperText={
                                        errors.Name && "Invalid value ... min length equal 3"
                                    }
                                    error={Boolean(errors.Name)}
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    sx={{ my: "8px" }}
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}

                                />
                                <TextField
                                    {...register("Phone", {
                                        required: true,
                                        pattern:
                                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                    })}
                                    helperText={errors.Phone && "Invalid Phone Number"}
                                    fullWidth
                                    error={Boolean(errors.Phone)}
                                    value={phone}
                                    label="Phone"
                                    sx={{ my: "8px" }}
                                    variant="outlined"
                                    onChange={(event) => setPhone(event.target.value)}

                                />
                                <TextField
                                    {...register("email", {
                                        required: true,
                                        pattern:
                                            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                    })}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email && "Invalid Email"}
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    sx={{ my: "8px" }}
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}

                                />
                                <TextField
                                    id="filled-textarea"
                                    label="Comment"
                                    multiline
                                    fullWidth
                                    minRows={7} variant="outlined"
                                    onChange={(event) => setComment(event.target.value)}
                                    value={comment}
                                />


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
                                <Snackbar
                                    open={open} autoHideDuration={4000} onClose={handleClose}>
                                    <Alert
                                        onClose={handleClose}
                                        severity="success"
                                        variant="filled"
                                        sx={{ width: '100%' }}
                                    >
                                        your message has been sent
                                    </Alert>
                                </Snackbar>
                            </Box>

                        </Paper>
                    </Box>
                    <Box width={"300px"} flexGrow={1} >
                        {ListLocation("123 Stree New York City , United States Of America NY 750065.", "(372) 587-2335", "info@example.com")}
                    </Box>
                </Stack>
                <Box position={"relative"} my={"80px"}>
                    <iframe
                        title="location"
                        src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19056.005897173953!2d-6.259336!3d53.343243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9b76719607%3A0x9d13471d963893a7!2s1%20Grafton%20Street%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sus!4v1705845104296!5m2!1sen!2sus"}
                        width={"100%"}
                        height="500"
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <Paper sx={{ position: "absolute", top: "5%", left: "5%", padding: "20px" }}>
                        <Stack gap={2.5}>
                            <Typography variant="h5" fontWeight={"bold"}>
                                Find Our Store
                            </Typography>
                            <Typography variant="h6" borderBottom={"1px solid var(--txt--second)"}>
                                Address
                            </Typography>
                            <Typography>
                                South Street road,
                                84457 Powlowski Stream Suite 332
                            </Typography>
                            <Typography variant="h6" borderBottom={"1px solid var(--txt--second)"}>
                                Opening hours
                            </Typography>
                            <List >
                                <ListItem>
                                    <Typography color={"var(--txt--second)"} mb={1}>
                                        Mon - Fri, 7:30am - 04:30pm
                                    </Typography>
                                </ListItem>
                                <ListItem>

                                    <Typography color={"var(--txt--second)"} mb={1}>
                                        Saturday, 8:30am - 06:30pm
                                    </Typography>
                                </ListItem>
                                <ListItem>

                                    <Typography color={"var(--txt--second)"} mb={1}>
                                        Sunday, 10:30am - 10:30pm
                                    </Typography>
                                </ListItem>
                            </List>
                        </Stack>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}