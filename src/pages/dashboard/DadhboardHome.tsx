import { Stack } from "@mui/material";
import CardDashboard from "../../component/CardDashboard";
import { Group, LocalMall, Rocket, Visibility } from "@mui/icons-material";
import BarChart from "../../component/barChart";
import PieChart from "../../component/PieChart";
import OrderActivity from "../../component/OrderActivity";
import TopUsers from "../../component/Users";
import Orders from "../../component/Order";
export default function DashboardHome() {
    return (
        <>
            <Stack flexDirection={"row"} gap={3} flexWrap={"wrap"} >
                <CardDashboard icon={<LocalMall />} title={"Today Orders"} value={"3,89,658 "} />
                <CardDashboard icon={<Visibility />} title={"Today Visitor"} value={"1,648,29 "} />
                <CardDashboard icon={<Rocket />} title={"Total Expense"} value={"6,48,249 "} />
                <CardDashboard icon={<Group />} title={"New Users"} value={"$5,265,3 "} />
            </Stack>
            <Stack flexDirection={"row"} my={"20px"} gap={3} flexWrap={"wrap"}>
                <BarChart />
                <PieChart />
            </Stack>
            <Stack flexDirection={"row"} my={"20px"} gap={3} flexWrap={"wrap"}>
                <OrderActivity />
                <TopUsers />
            </Stack>
            <Stack my={"20px"}>
                <Orders />
            </Stack>
        </>
    )
}