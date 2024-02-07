import { Call, Email, LocationOn } from "@mui/icons-material";
import { Box, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
export const ListLocation = (address: string, phone: string, email: string) => {
    return (
        <List>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <LocationOn sx={{ fontSize: "40px" }} />
                </ListItemAvatar>
                <ListItemText primary={
                    <Typography fontWeight={"bold"} fontSize={"25px"} my={"15px"} sx={{ marginTop: "0", p: "0", marginBottom: "20px" }}> Address</Typography>
                } secondary={<Typography fontSize={"16px"} my={"15px"} color={"var(--txt--second)"}> {address}</Typography>
                } />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Call sx={{ fontSize: "40px" }} />
                </ListItemAvatar>
                <ListItemText primary={
                    <Typography fontWeight={"bold"} fontSize={"25px"} my={"15px"} sx={{ marginTop: "0", p: "0", marginBottom: "20px" }}> Phone</Typography>
                } secondary={<Typography fontSize={"16px"} my={"15px"} color={"var(--txt--second)"}> {phone}</Typography>
                } />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Email sx={{ fontSize: "40px" }} />
                </ListItemAvatar>
                <ListItemText primary={
                    <Typography fontWeight={"bold"} fontSize={"25px"} my={"15px"} sx={{ marginTop: "0", p: "0", marginBottom: "20px" }}> Email</Typography>
                } secondary={<Typography fontSize={"16px"} my={"15px"} color={"var(--txt--second)"}> {email}</Typography>
                } />

            </ListItem>
        </List>
    )
}
export default function LocationComponent(props: {
    dir: "row" | "row-reverse" | "column" | "column-reverse" | undefined; address: string, phone: string, email: string, map: string
}) {
    return (

        <Stack direction={props.dir} flexWrap={"wrap"}>
            <Box width={"400px"} flexGrow={1} >
                {ListLocation(props.address, props.phone, props.email)}
            </Box>
            <Box width={"400px"} flexGrow={1}>
                <iframe
                    title="location"
                    src={props.map}
                    width={"100%"}
                    height="400"
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Box>
        </Stack>
    )
}