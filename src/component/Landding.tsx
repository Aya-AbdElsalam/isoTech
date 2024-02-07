import { Typography, Stack, Button, Container } from "@mui/material";
import bglap from "../images/2_f639d039-1b63-405c-ab7d-4561d7871d76.webp"
import bgphone from "../images/2_ae5cc69e-78af-4aea-9cc7-bb616d558539.avif"
import bgphone2 from "../images/1_1cae1484-6708-4556-af27-18db5a0b650c.webp"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../rtk/Store";
import { FilterCat } from "../rtk/Slices/ProductSlice";
import watchBG from "../images/watch.webp"
import cameraBG from "../images/camera.webp"
import accBG from "../images/a.webp"

export default function Landding() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    return (
        <Container>
            <Stack direction={"row"} flexWrap={"wrap"} gap={3} >
                <Stack borderRadius={"15px"} width={"500px"} p={"20px"} gap={1} flexGrow={2} sx={{ background: `url(${bglap})`, backgroundSize: "cover" }} minHeight={"300px"} justifyContent={"center"}>
                    <Typography variant="h1" fontSize={"25px"} color={"white"} fontWeight={"bold"}>
                        Galaxy Folding Phones</Typography>
                    <Typography fontWeight={"bold"} color={"lightgray"}>

                        Which can vary depending on the brand and model electronic device.</Typography>
                    <Link to={"../Shop"}>
                        <Button onClick={() => dispatch(FilterCat("Mobile"))} sx={{ width: "100px", color: "white", backgroundSize: "cover", background: "var(--btn--main)", "&:hover": { background: "var(--btn--hover)" } }}>SHOP NOW</Button>
                    </Link>
                </Stack>
                <Stack width={"300px"} flexGrow={1} gap={3}>
                    <Stack p={"20px"} gap={1} sx={{ background: `url(${bgphone})`, backgroundSize: "cover" }} borderRadius={"15px"}>
                        <Typography variant="h1" fontSize={"21px"} color={"white"} fontWeight={"bold"}>

                            Modern Mobile Phones
                        </Typography>
                        <Typography color={"white"} width={"70%"} fontSize={"14px"}>
                            Mobile phone technology has advanced rapidly over the years, with various
                        </Typography>
                        <Link to={"../Shop"}>
                            <Button onClick={() => dispatch(FilterCat("Mobile"))} sx={{ width: "100px", color: "white", background: "var(--btn--main)", "&:hover": { background: "var(--btn--hover)" } }}>SHOP NOW</Button>
                        </Link>
                    </Stack>
                    <Stack p={"20px"} gap={1} sx={{ background: `url(${bgphone2})`, backgroundSize: "cover" }} borderRadius={"15px"}>
                        <Typography variant="h1" fontSize={"21px"} color={"white"} fontWeight={"bold"}>
                            Motorola Edge Phone
                        </Typography>
                        <Typography color={"white"} width={"70%"} fontSize={"14px"}>
                            Mobile phone technology has advanced rapidly over the years, with various
                        </Typography>
                        <Link to={"../Shop"}>
                            <Button onClick={() => dispatch(FilterCat("Mobile"))} sx={{ width: "100px", color: "white", background: "var(--btn--main)", "&:hover": { background: "var(--btn--hover)" } }}>SHOP NOW</Button>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction={"row"} flexWrap={"wrap"} my={"20px"} gap={3}>
                <Stack minHeight={"120px"} borderRadius={"15px"} width={"300px"} flexGrow={1} sx={{ background: `url(${accBG})`, backgroundSize: "cover" }} p={"20px"}>
                    <Typography variant="h1" fontSize={"25px"} color={"white"} fontWeight={"bold"}>
                        Accessories</Typography>
                    <Button sx={{ color: "white", textDecoration: "underline", justifyContent: "flex-start", fontWeight: "bold" }} onClick={(() => {
                        dispatch(FilterCat("Accessories"))
                        navigate("../Shop")
                    })}>
                        SHOP NOW
                    </Button>

                </Stack>
                <Stack width={"300px"} borderRadius={"15px"} minHeight={"120px"} flexGrow={1} sx={{ background: `url(${watchBG})`, backgroundSize: "cover" }} p={"20px"}>
                    <Typography variant="h1" fontSize={"25px"} color={"white"} fontWeight={"bold"}>
                        Watch</Typography>
                    <Button sx={{ color: "white", textDecoration: "underline", justifyContent: "flex-start", fontWeight: "bold" }} onClick={(() => {
                        dispatch(FilterCat("watch"));
                        navigate("../Shop")
                    })}>
                        SHOP NOW

                    </Button>

                </Stack>
                <Stack width={"300px"} borderRadius={"15px"} minHeight={"120px"} flexGrow={1} sx={{ background: `url(${cameraBG})`, backgroundSize: "cover" }} p={"20px"}>
                    <Typography variant="h1" fontSize={"25px"} color={"white"} fontWeight={"bold"}>
                        Camera</Typography>
                    <Button sx={{ color: "white", textDecoration: "underline", justifyContent: "flex-start", fontWeight: "bold" }} onClick={(() => {
                        dispatch(FilterCat("camera"));
                        navigate("../Shop")
                    })}>
                        SHOP NOW

                    </Button>

                </Stack>
            </Stack>

        </Container>
    )
}