import { Autocomplete, Container, Stack, TextField, Typography, InputBase, styled, alpha } from "@mui/material";
import Title from "../component/Title";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FilterApply, FilterSearch, FilterSort, fetchProducts, fetchcategories } from "../rtk/Slices/ProductSlice";
import { AppDispatch, RootState } from "../rtk/Store";
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Filtercom from "../component/Filter";
import CardProducts from "../component/CardProduct";
export default function Shop() {
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    let products = selector((state) => {
        return state.ProductSlice.product;
    });
    const loading = selector((state) => {
        return state.ProductSlice.loading;
    });
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchcategories());
    }, []);
    const options = ["Higher price", "Lower price"];
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingRight: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
        },
    }));
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        width: '100%',

    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }));
    const [search, setsearch] = React.useState("")
    return (
        <>
            <Title title="PRODUCTS" />
            <Container sx={{ my: "60px" }}>
                <Stack width={"100%"} sx={{ background: "white" }} p={"10px"} my={"30px"} flexDirection={"row"} alignItems={"center"}>
                    <Typography fontWeight={"bold"}>{products.length} - Results </Typography>
                    <Search sx={{ height: "fit-content", width: "50%", mx: "auto", display: { xs: "none", md: "flex" }, flexDirection: "row-reverse", border: "1px solid" }}>
                        <SearchIconWrapper sx={{ background: "var(--btn--main)", color: "white" }}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            autoFocus
                            onChange={(event) => {
                                dispatch(FilterSearch(event.target.value))
                                dispatch(FilterApply())
                                setsearch(event.target.value)
                            }}
                            value={search}
                        />
                    </Search>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        sx={{ width: 300, marginLeft: "auto" }}
                        onChange={(event, newValue: string | null) => {
                            dispatch(FilterSort(newValue))
                            dispatch(FilterApply())
                        }} renderInput={(params) => <TextField {...params} label="Sorted By" />}
                    />

                </Stack>

                <Stack direction={"row"} flexWrap={"wrap"} gap={4} alignItems={"flex-start"}>
                    <Filtercom />
                    <Stack display={{ xs: "flex", md: "none" }} width={"100%"} sx={{ background: "white" }} p={"10px"} my={"30px"} flexDirection={"row"} alignItems={"center"}>
                        <Search sx={{ height: "fit-content", display: "flex", flexDirection: "row-reverse", border: "1px solid" }}>
                            <SearchIconWrapper sx={{ background: "var(--btn--main)", color: "white" }}>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                id="searchProduct"
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                autoFocus
                                onChange={(event) => {
                                    dispatch(FilterSearch(event.target.value))
                                    dispatch(FilterApply())
                                    setsearch(event.target.value)
                                }}
                                value={search}

                            />
                        </Search>


                    </Stack>
                    <CardProducts loading={loading} products={products} justifyXs='center' justifySm='flex-start' />
                </Stack>
            </Container>


        </>
    )
}