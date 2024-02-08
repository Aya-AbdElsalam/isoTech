import { Stack, Typography } from "@mui/material";
export default function Title(props: { title: string }) {
    return (
        <>
            <Stack textAlign={"center"} justifyContent={"center"} sx={{ background: "white", height: "300px" }}>
                <Typography variant="h1" fontSize={"39px"} fontWeight={"bold"}>{props.title}</Typography>
            </Stack>
        </>
    )
}