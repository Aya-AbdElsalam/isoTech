import { Stack, Typography } from "@mui/material";
export default function SubTitle(props: {
    my?: number, font?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", title: string, txt?: "center" | "end" | "justify" | "left" | "right" | "start", left?: string,
}) {
    return (
        <>
            <Stack textAlign={props.txt} justifyContent={"center"} my={props.my || "60px"} >
                <Typography variant={props.font ? props.font : "h4"} fontWeight={"bold"} sx={{ position: "relative", "&:before": { content: '""', width: "17%", position: "absolute", height: "3px", background: "var(--txt--hover)", top: "116%", left: props.left } }}>{props.title}</Typography>
            </Stack>
        </>
    )
}