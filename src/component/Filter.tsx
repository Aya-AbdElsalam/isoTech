import SubTitle from "../component/SubTitle";
import Slider from '@mui/material/Slider';
import { FilterCat, FilterColor, FilterPriceMax, FilterPriceMin, FilterApply, FilterImg } from "../rtk/Slices/ProductSlice";
import { Box, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../rtk/Store";

export default function Filtercom() {
    const selector: TypedUseSelectorHook<RootState> = useSelector
    const dispatch = useDispatch<AppDispatch>()
    const [value, setPrice] = React.useState<number[]>([230, 380]);
    const Categories = selector((state) => {
        return state.ProductSlice.categories;
    });
    const loadingcategories = selector((state) => {
        return state.ProductSlice.loadingCategories;
    });
    const handleChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
        dispatch(FilterPriceMin((newValue as number[])[0]))
        dispatch(FilterPriceMax((newValue as number[])[1]))
        dispatch(FilterApply())
        dispatch(FilterImg())
    };
    const handleChangeRadioCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(FilterCat(event.target.value));
        dispatch(FilterApply())
        dispatch(FilterImg())
    };
    const handleChangeRadioColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(FilterColor(event.target.value));
        dispatch(FilterApply())
        dispatch(FilterImg())
    };
    let img = selector((state) => {
        return state.ProductSlice.filterimg;
    });
    const color = selector((state) => {
        return state.ProductSlice.filterColor;
    });
    const cat = selector((state) => {
        return state.ProductSlice.filterCat;
    });

    useEffect(() => {
        img.map((i): void => {
            let imgChange = document.getElementById(`${i.id}${i.price}`) as HTMLImageElement
            if (color.toLocaleLowerCase() !== "all") {
                let img = i.color.find((i: { color: string }): string[] | boolean => {
                    return i.color.toLowerCase() === color.toLowerCase()
                })
                if (img !== undefined) imgChange.src = img.img
            }
        })

    }, [color, img])
    return (
        <Paper sx={{ flexGrow: "1", width: "200px", padding: "10px" }} >
            <Box width={"fit-content"} mx={"auto"}>
                <SubTitle left="left" title="FILTER" font={"h6"}></SubTitle>
                <Typography fontSize={"17px"} fontWeight={"bold"} textTransform={"uppercase"}>
                    Price
                </Typography>
                <Box sx={{ width: 300 }}>
                    {loadingcategories ? (<Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={230}
                        sx={{ width: "70%" }}
                        max={380}
                    />) : (<><Skeleton width={"90%"} variant="text"></Skeleton><Skeleton width={"90%"} variant="text"></Skeleton></>)}
                    <Typography color={"var(--txt--second)"}>
                        Price: {value[0]}$ - {value[1]}$
                    </Typography>
                </Box>
                <Typography fontSize={"17px"} fontWeight={"bold"} textTransform={"uppercase"} mt={"20px"}>
                    Categories
                </Typography>

                <FormControl sx={{ width: "100%" }}>
                    <RadioGroup
                        sx={{ paddingLeft: "10px" }}
                        onChange={handleChangeRadioCategories}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={cat}
                        id="rrr"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel sx={{ fontSize: "14px" }} value={"all"} control={<Radio size="small" />} label={"All"} />
                        {loadingcategories ? (Categories.map((c, index) =>
                        (<FormControlLabel key={index} control={<Radio size="small" />} label={c.categorie} value={c.categorie.toLowerCase()} />
                        )
                        )) : (<><Skeleton width={"90%"} variant="text"></Skeleton><Skeleton width={"90%"} variant="text"></Skeleton></>)
                        }
                    </RadioGroup>
                </FormControl>
                <Typography fontSize={"17px"} fontWeight={"bold"} textTransform={"uppercase"} mt={"20px"}>
                    Color
                </Typography>
                <FormControl sx={{ width: "100%" }}>
                    <RadioGroup
                        onChange={handleChangeRadioColor}
                        sx={{ paddingLeft: "10px" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="All"
                        name="radio-buttons-group"
                    >
                        {loadingcategories ? (<><FormControlLabel value="All" control={<Radio size="small" />} label="All" /><FormControlLabel value="red" control={<Radio size="small" />} label="Red" /><FormControlLabel value="black" control={<Radio size="small" />} label="Black" /><FormControlLabel value="blue" control={<Radio size="small" />} label="Blue" /><FormControlLabel value="orange" control={<Radio size="small" />} label="orange" /><FormControlLabel value="pink" control={<Radio size="small" />} label="pink" /><FormControlLabel value="white" control={<Radio size="small" />} label="white" /><FormControlLabel value="silver" control={<Radio size="small" />} label="silver" /></>) : (<><Skeleton width={"90%"} variant="text"></Skeleton><Skeleton width={"90%"} variant="text"></Skeleton></>)}
                    </RadioGroup>
                </FormControl>
            </Box>

        </Paper>
    )
}