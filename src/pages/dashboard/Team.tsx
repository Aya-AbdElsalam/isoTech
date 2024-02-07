import { GridToolbar } from '@mui/x-data-grid';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../../rtk/Store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Title from '../../component/Title';
import { IconButton, Stack } from '@mui/joy';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
} from "@mui/material";
import { green } from '@mui/material/colors';
import { fetchteam } from '../../rtk/Slices/TeamSlice';

export default function Team() {
    const [success] = React.useState(false);
    const [load, setLoading] = React.useState(false)
    const buttonSx = {
        fontSize: "12px",
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const navigate = useNavigate()
    React.useEffect(() => {
        dispatch(fetchteam());
    }, []);
    const team = selector((state) => {
        return state.TeamSlice.team;
    });
    const loading = selector((state) => {
        return state.TeamSlice.loading;
    });
    const columns: GridColDef[] = [
        { field: "id", headerName: 'ID', width: 110 },
        {
            field: 'name',
            headerName: 'NAME',
            width: 230,
        },
        {
            field: 'img',
            headerName: 'IMG',
            width: 130,
            renderCell: ({ row: img }) => {
                return (
                    <img src={img.img} width={"100%"} height={"100%"} alt=''>
                    </img>
                )
            },
        },
        {
            field: 'jopTitle',
            headerName: 'jopTitle',
            width: 200,
        },
        {
            field: 'age',
            headerName: 'AGE',
            width: 110,
        },
        {
            field: 'actions',
            headerName: 'ACTIONS',
            width: 110,
            renderCell: ({ row: id }) => {
                return (
                    <Stack direction={"row"} gap={2}>
                        <Box sx={{ position: 'relative' }}>
                            <IconButton
                                sx={buttonSx}
                                type="submit"
                                disabled={load}
                                onClick={() => {
                                    setLoading(true)
                                    fetch(`https://isotechdata.onrender.com/team/${id.id}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    })
                                        .then((res) => res.json()).then(() => { dispatch(fetchteam()) }).then(() =>
                                            loading && setLoading(false)
                                        )
                                }}><DeleteForever />

                            </IconButton>
                            {load && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>

                        <IconButton onClick={() => {
                            navigate(`../team/edit/${id.id}`)
                        }}><Edit /> </IconButton>
                    </Stack>
                );
            },
        },
    ];

    const rows = [
        team.map((p, index) => {
            return {
                id: p.id,
                name: p.name,
                jopTitle: p.jopTitle,
                age: p.age,
                img: p.img,
            }
        })

    ];
    return (
        <><Title title='TEAM' /><Box sx={{ height: "max-content", width: '100%' }}>
            <DataGrid
                density='comfortable'
                slots={{ toolbar: GridToolbar }}
                rows={loading ? rows[0] : []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                sx={{ mt: "50px" }}
                pageSizeOptions={[8]}
                disableRowSelectionOnClick />
            <Link to="addTeam">
                <Button sx={{ mb: "40px", mt: "15px" }} variant='contained'>ADD MEMBER</Button>
            </Link>
        </Box></>
    );
}