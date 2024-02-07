import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AlertSign(props: { addvalue: boolean | undefined; handleCloseAdd: () => void; signValue: boolean | undefined; handleCloseSign: () => void; }) {
    const navigate = useNavigate()
    return (
        <>
            <Snackbar open={props.addvalue} autoHideDuration={3000} onClose={() => { props.handleCloseAdd() }}>
                <Alert
                    onClose={() => { props.handleCloseAdd() }}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    The item has been add to cart
                </Alert>
            </Snackbar>
            <Snackbar open={props.signValue} onClose={() => { props.handleCloseSign() }}>
                <Alert
                    severity="warning"
                    variant="filled"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                props.handleCloseSign()
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ width: "300px" }}
                >
                    <Typography height={"100%"} onClick={() => { navigate("../signIn") }} sx={{ textDecoration: "underline" }}>
                        you should sign in
                    </Typography>

                </Alert>
            </Snackbar>
        </>
    )
}