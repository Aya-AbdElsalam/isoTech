import React from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../rtk/Store"
import { fetchOpenMail } from "../../rtk/Slices/MailSlice"
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Title from "../../component/Title"
import Skeleton from '@mui/material/Skeleton';
import { Avatar } from '@mui/joy';

export default function MailDetails() {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const navigate = useNavigate()
    React.useEffect(() => {
        dispatch(fetchOpenMail(params.id));
    }, []);
    const mail = selector((state) => {
        return state.mailSlice.openMail;
    });

    const loading = selector((state) => {
        return state.mailSlice.loadingOpenMail;
    });
    return (
        <><Title title="MAIL" ></Title>
            <Stack spacing={2} useFlexGap my={"40px"}>

                <Card variant="outlined" sx={{ width: "100%", boxSizing: "border-box" }} >
                    <CardContent orientation="horizontal" sx={{ my: "20px" }}>
                        {loading ? <Avatar sx={{ bgcolor: 'var(--btn--main)', color: "white", width: "45px", height: "45px" }}>{(mail.name) && mail.name.toString().slice(0, 2).toUpperCase()}</Avatar> : <Skeleton animation="wave" variant="circular" width={48} height={48} />}
                        <div>
                            {loading ? <>
                                <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                                    {mail.name} <Typography sx={{ fontSize: "13px", fontWeight: "normal", color: "var(--txt--second)" }}>
                                        {mail.date}
                                    </Typography>
                                </Typography>
                                <Typography sx={{ fontSize: "15px" }}>
                                    {mail.email}
                                </Typography>
                                <Typography sx={{ fontSize: "15px" }}>
                                    phone:{mail.phone}
                                </Typography>
                            </> : <><Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    sx={{ width: 200 }} /></>}
                        </div>
                    </CardContent>
                    {loading ? <Typography sx={{ fontSize: "15px" }}>
                        {mail.comment}
                    </Typography> :
                        <Skeleton variant="rectangular" animation={"wave"} sx={{ width: "100%", height: "300px" }} />}
                </Card>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore"
                    sx={{ fontWeight: 600, maxWidth: "200px" }}
                    onClick={() => {
                        navigate(`../mail`)
                    }}
                >
                    Back to Mail
                </Button>
            </Stack>
        </>
    )
}