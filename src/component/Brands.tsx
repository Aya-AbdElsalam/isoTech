import Tabs from '@mui/material/Tabs';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../rtk/Store';
import { useEffect } from 'react';
import { fetchBrands } from '../rtk/Slices/BrandSlice';
import { Skeleton } from '@mui/lab';
export default function Brands() {
    const dispatch = useDispatch<AppDispatch>()
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const Brands = selector((state) => {
        return state.BrandSlice.Brand
    });
    const loading = selector((state) => {
        return state.BrandSlice.loading
    });
    useEffect(() => {
        dispatch(fetchBrands())
    }, [])
    return (
        <Tabs
            sx={{ background: "white", my: "60px" }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={0}
            TabIndicatorProps={{ style: { background: 'transparent' } }}        >
            {loading ? Brands.map((b: { id: string | undefined; img: string }) => {
                return (
                    <img loading="lazy"
                        key={b.id}
                        id={b.id}
                        width={"180px"}
                        height={"110px"}
                        style={{ margin: "10px" }}
                        src={b.img}
                        alt='' ></img>
                )
            }) : Array.from(new Array(6)).map((i, index) => {
                return (
                    <Skeleton width={"180px"}
                        key={index}
                        height={"110px"}
                        sx={{ margin: "10px" }} />
                )
            })}
        </Tabs>
    )

}