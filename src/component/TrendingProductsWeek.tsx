import * as React from 'react';
import { Container, Box, Tab, Tabs, Stack } from '@mui/material';
import SubTitle from './SubTitle';
import { AppDispatch, RootState } from '../rtk/Store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FilterHomeProductsWeek, fetchProductsTrendingWeek, fetchcategories } from '../rtk/Slices/ProductSlice';
import CardProducts from './CardProduct';
export default function TrendingProductsWeek() {
    const dispatch = useDispatch<AppDispatch>()
    const [value, setValue] = React.useState('ALL');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const Categories = selector((state) => {
        return state.ProductSlice.categories;
    });
    const products = selector((state) => {
        return state.ProductSlice.productTrendingWeek
    });
    const loading = selector((state) => {
        return state.ProductSlice.loadingProductTrending
    });

    React.useEffect(() => {
        dispatch(fetchProductsTrendingWeek());
        dispatch(fetchcategories());
    }, [dispatch]);
    return (
        <Container>
            <SubTitle title='Trending This Week' />
            <Box sx={{ width: '100%' }}>
                <Tabs
                    variant="scrollable"
                    scrollButtons
                    value={value}
                    onChange={handleChange}
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    <Tab value={"ALL"} label={"ALL"} onClick={(() => { dispatch(FilterHomeProductsWeek("all")) })} />
                    {Categories.map((c) => {
                        return (
                            <Tab value={c.categorie} label={c.categorie} onClick={(() => { dispatch(FilterHomeProductsWeek(c.categorie)) })} />
                        )
                    })}
                </Tabs>
                <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={"20px"}>
                    <CardProducts loading={loading} products={products} justifyXs='center' justifySm='flex-start' />
                </Stack>
            </Box>
        </Container>
    )
}