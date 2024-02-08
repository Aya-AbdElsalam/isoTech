import { useEffect, useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/joy";

export default function Orders() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://isotechdata.onrender.com/orders").then((res) => res.json()).then((data) => setData(data))
    })
    const rows = [
        data.map((t: { id: string, Customer: string, Email: string, Phone: string, item: string, price: string, date: string, status: string, payment: string }) => {
            return {
                id: t.id,
                Customer: t.Customer,
                Email: t.Email,
                Phone: t.Phone,
                item: t.item,
                price: t.price,
                date: t.date,
                status: t.status,
                payment: t.payment,
            };
        }),
    ];
    const columns = [
        { overFlow: "none", field: "id", headerName: "ID", width: 50 },
        {
            field: "Customer",
            headerName: "Customer",
            flex: 1,
            minWidth: 166
        },
        {
            field: "Email",
            headerName: "Email",
            flex: 1,
            minWidth: 180

        },
        {
            field: "Phone",
            headerName: "Phone",
            flex: 1,
            minWidth: 166

        },
        {
            field: "item",
            headerName: "Item",
            flex: 1.5,
            minWidth: 166

        },
        {
            width: 30,
            field: "price",
            headerName: "Price",
            minWidth: 120

        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            minWidth: 166

        },
        {
            field: "payment",
            headerName: "Payment",
            minWidth: 120
        },
    ];

    return (
        <Paper sx={{ width: "100%", flexGrow: 1, height: "500px", padding: "10px", boxSizing: "border-box", overflow: "auto", }} >
            <Typography fontWeight={"bold"} my="20px" borderBottom={"1px solid var(--txt--second)"} pb={"10px"}>ORDERS HISTORY</Typography>

            <Stack direction={"row"}>
                <Box width={"1000px"} flex={1}>
                    <DataGrid
                        rows={rows[0]}
                        columns={columns}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 7,
                                },
                            },
                        }}
                        pageSizeOptions={[7]}
                    />
                </Box>
            </Stack>
        </Paper>
    );
}
