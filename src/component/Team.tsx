import * as React from 'react';
import { Typography, Box, Skeleton, Stack } from '@mui/material';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchteam } from "../rtk/Slices/TeamSlice";
import { AppDispatch, RootState } from "../rtk/Store";
export default function Team() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchteam());
  }, [dispatch]);
  const selector: TypedUseSelectorHook<RootState> = useSelector
  const team = selector((state) => {
    return state.TeamSlice.team;
  });
  const loading = selector((state) => {
    return state.TeamSlice.loading;
  });
  return (
    <Stack flexDirection={"row"} gap={3} flexWrap={"wrap"} textAlign={"center"} justifyContent={"center"}>
      {(loading ? team : Array.from(new Array(3))).map((item, index) => (
        <Box key={index} sx={{ width: 260, marginRight: 0.5, my: 5 }} >
          {item ? (
            <img loading="lazy"
              style={{ width: "100%", height: 200 }}
              alt={item.title}
              src={item.img}
            />
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={200} />
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2" fontSize={"18px"} fontWeight={"bold"}>
                {item.name}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary" fontSize={"15px"}>
                {item.jopTitle}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );
}

