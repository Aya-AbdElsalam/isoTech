import { Stack, Typography } from "@mui/material";
import bg from "../images/bg.png"
export default function Title(props: { title: string }) {
    return (
        <>
            <Stack textAlign={"center"} justifyContent={"center"} sx={{ background: `url(${bg})`, height: "300px", backgroundSize: "cover" }}>
                <Typography variant="h1" fontSize={"39px"} fontWeight={"bold"}>{props.title}</Typography>
            </Stack>
        </>
    )
}