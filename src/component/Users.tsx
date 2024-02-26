import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { Place } from '@mui/icons-material';

export default function TopUsers() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://isotechdata.onrender.com/users").then((res) => res.json()).then((data) => setData(data))
    })
    return (
        <Paper sx={{ width: "400px", flexGrow: 1, height: "500px", padding: "10px", boxSizing: "border-box", overflow: "auto", }} >
            <Typography fontWeight={"bold"} my="20px" borderBottom={"1px solid var(--txt--second)"} pb={"10px"}>Top Users</Typography>
            {data.map((i: {
                phone: string;
                TotalBuy: string; Name: string, country: string
            }, index) => {
                return (
                    <>
                        <Stack flexDirection={"row"} gap={2} justifyContent={"space-between"} my={"20px"} key={index}>
                            <Box width={"200px"}>
                                <Typography fontWeight={"bold"}>{i.Name}</Typography>
                                <Stack fontSize={"17px"} sx={{ opacity: ".7" }} alignItems={"center"} flexDirection={"row"}>
                                    <Place sx={{ fontSize: '17px' }} />     {i.country}
                                </Stack>
                            </Box>
                            <Box width={"100px"}>
                                <Typography fontWeight={"bold"}>Total buy</Typography>
                                <Typography>{i.TotalBuy}</Typography>
                            </Box>
                            <Box width={"200px"}>
                                <Typography>{i.phone}</Typography>
                            </Box>
                        </Stack></>
                )
            })}
        </Paper>

    )
}