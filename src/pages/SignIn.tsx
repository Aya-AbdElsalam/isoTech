import { Alert, Button, Skeleton, Typography, Box, Container, TextField } from "@mui/material";
import Title from "../component/Title";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../rtk/Store";
import { fetchUser, fetchsignIn } from "../rtk/Slices/UserSlice";
import { userItem } from "../rtk/Slices/CartSlice";
import { userItemWish } from "../rtk/Slices/wishListSlice";

export default function SignIn() {
    const dispatch = useDispatch<AppDispatch>()
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const [alert, setAlert] = useState(false)
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    return (
        <>
            <Title title="Sign in" />
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "80px" }}>
                <Box width={"350px"} component={"form"} onSubmit={handleSubmit((data) => {
                    let user = users.find((u) => {
                        return u.email === email
                    })
                    if (user) {
                        if (user.email === email && user.pass === pass) {
                            dispatch(fetchUser(user))
                            dispatch(userItem())
                            dispatch(userItemWish())
                            navigate("/")
                        }
                        else {
                            setAlert(true)
                        }
                    }
                    else {
                        setAlert(true)
                    }
                })
                }>
                    {loading ? (<> <TextField
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
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                            setAlert(false)
                        }}
                    />
                        <TextField
                            {...register("Password", { required: true, minLength: 3 })}
                            helperText={
                                errors.Password && "Invalid password ... min length equal 3"
                            }
                            type="password"
                            error={Boolean(errors.Password)}
                            fullWidth
                            label="Password"
                            variant="outlined"
                            sx={{ my: "8px" }}
                            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPass(event.target.value);
                                setAlert(false)

                            }}
                        /></>) : <><Skeleton variant="rounded" height={"40px"} sx={{ my: "20px" }}></Skeleton><Skeleton variant="rounded" height={"40px"}></Skeleton></>}
                    {alert && <Alert severity="error">Password or Email Is Incorrect </Alert>
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
                        SIGN IN
                    </Button>) : (<Skeleton variant="rounded" sx={{ my: "20px" }}></Skeleton>)}
                    <Link to={"../signUp"} >
                        <Typography color={"var(--txt--second)"} sx={{ textDecoration: "underline", "&:hover": { color: "var(--btn--main)" } }}>New customer? Sign up for an account</Typography>

                    </Link>
                </Box>
            </Container>
        </>
    )
}