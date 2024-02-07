import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../rtk/Store";
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { fetchfeedback } from '../rtk/Slices/Feedback';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
export default function FeedBack() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchfeedback());
  }, [dispatch]);
  const selector: TypedUseSelectorHook<RootState> = useSelector
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  let box = document.querySelector('.product-container') as HTMLDivElement
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    box.scrollLeft = box.scrollLeft + 320 + 30 + 30;
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    box.scrollLeft = box.scrollLeft - (320 + 30 + 30);
  };
  const feedback = selector((state) => {
    return state.FeedbackSlice.feedback;
  });
  const loading = selector((state) => {
    return state.FeedbackSlice.loading;
  });
  return (
    <>
      <Stack flexDirection={"row"} gap={"23px"} whiteSpace={"nowrap"} className='product-container' overflow={"hidden"}>
        {(loading ? feedback : Array.from(new Array(3))).map((item, index) => (
          <Paper className='cardFeedback' key={index} sx={{ minWidth: "320px", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", padding: "20px", textAlign: "center" }}>
            {loading ? (<Avatar sx={{ width: 100, height: 100, outline: "1px solid black", padding: "10px" }} >
              <img loading="lazy"
                alt=''
                style={{ width: "110px", height: "110px", borderRadius: "50%" }}
                src={item.img}
              />
            </Avatar>) : (<Skeleton variant="rectangular" width={"100%"} height={200} />)}
            {
              loading ? (
                <Box py={"20px"}>
                  <Typography gutterBottom variant="body2" fontSize={"18px"} fontWeight={"bold"}>
                    {item.user}
                  </Typography>
                  <Typography display="block" variant="caption" color="text.secondary" fontSize={"15px"} sx={{ textWrap: "wrap" }}>
                    {item.comment}
                  </Typography>
                </Box>
              ) : <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            }
          </Paper>

        ))}

      </Stack>
      {loading && (<MobileStepper
        variant="dots"
        steps={feedback.length}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1, mx: "auto", my: "40px", background: "transparent" }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === feedback.length}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />)}
    </>
  );
}

