import { Alert, Button, Skeleton, Typography, Box, Container, TextField, Snackbar, SnackbarOrigin } from "@mui/material";
import Title from "../component/Title";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchsignIn } from "../rtk/Slices/UserSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../rtk/Store";
interface State extends SnackbarOrigin {
    open: boolean;
}
export default function SignUp() {
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [name, setname] = useState("")
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const [alert, setAlert] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const { vertical, horizontal, open } = state;
    const handleClose = () => {
        setState({ ...state, open: false });
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        dispatch(fetchsignIn())
    }, [dispatch])
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const users = selector((state) => {
        return state.signInlice.SignIn;
    });
    const loading = selector((state) => {
        return state.signInlice.loading;
    });
    return (
        <>
            <Title title="Sign up" />
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "80px" }}>
                <Box width={"350px"} component={"form"} onSubmit={handleSubmit((data) => {
                    let user = users.find((u) => {
                        return u.email === email
                    })
                    if (user) {
                        setAlert(true)
                    }
                    else {
                        fetch(`https://isotechdata.onrender.com/signIn`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                email,
                                pass,
                                id: Date.now(),
                            }),
                        })
                        dispatch(fetchsignIn())
                        setState({ ...state, open: true });
                    }
                })
                }>
                    {loading ? (<><TextField
                        {...register("name", { required: true, minLength: 3 })}
                        helperText={errors.name && "Invalid value ... min length equal 3"}
                        error={Boolean(errors.name)}
                        fullWidth
                        label="Name"
                        variant="outlined"
                        sx={{ my: "8px" }}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setname(event.target.value);
                        }} /><TextField
                            {...register("email", {
                                required: true,
                                pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email && "Invalid Email"}
                            fullWidth
                            label="Email"
                            variant="outlined"
                            sx={{ my: "8px" }}
                            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(event.target.value);
                                setAlert(false);

                            }} /><TextField
                            {...register("Password", { required: true, minLength: 3 })}
                            helperText={errors.Password && "Invalid password ... min length equal 3"}
                            type="password"
                            error={Boolean(errors.Password)}
                            fullWidth
                            label="Password"
                            variant="outlined"
                            sx={{ my: "8px" }}
                            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPass(event.target.value);

                            }} /></>) : <><Skeleton variant="rounded" height={"40px"} sx={{ my: "20px" }}></Skeleton><Skeleton variant="rounded" height={"40px"}></Skeleton></>}
                    {alert && <Alert severity="error">This email has already exist, <Link style={{ textDecoration: "underline" }} to={"../signIn"}>Sign In</Link></Alert>
                    }
                    {loading ? (<Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: "100%",
                            fontWeight: "bold",
                            fontSize: "20px",
                            paddingY: "20px",
                            background: "var(--btn--main)",
                            my: "30px"
                        }}
                    >
                        SIGN UP
                    </Button>) : (<Skeleton variant="rounded" sx={{ my: "20px" }}></Skeleton>)}
                    <Snackbar anchorOrigin={{ vertical, horizontal }}
                        open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            your Account has been create, sign in NOW!!
                        </Alert>
                    </Snackbar>
                    <Link to={"../signIn"} >
                        <Typography color={"var(--txt--second)"} sx={{ textDecoration: "underline", "&:hover": { color: "var(--btn--main)" } }}>Have Account? Sign in for your account</Typography>

                    </Link>
                </Box>
            </Container>
        </>
    )
}