import { Outlet } from "react-router-dom";
import SideNav from "../component/SideNavBar";
import { Container } from "@mui/material";

export default function Dashboard() {
    return (
        <>
            <SideNav />
            <Container>
                <Outlet />
            </Container>

        </>
    )
}