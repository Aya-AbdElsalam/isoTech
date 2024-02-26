import { Typography } from '@mui/joy'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import { typographyClasses } from '@mui/joy/Typography';
import { Cancel, DeliveryDining, SentimentSatisfied } from '@mui/icons-material';
export default function OrderActivity() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://isotechdata.onrender.com/orderActivity").then((res) => res.json()).then((data) => setData(data))
    })
    return (
        <Paper sx={{ width: "300px", flexGrow: 1, height: "500px", padding: "10px", boxSizing: "border-box", overflow: "auto", }} >
            <Typography fontWeight={"bold"} my="20px" borderBottom={"1px solid var(--txt--second)"} pb={"10px"}>Order Activity</Typography>
            <Stepper
                orientation="vertical"
                sx={{
                    '--StepIndicator-size': '2.5rem',
                    '--Step-gap': '1rem',
                    '--Step-connectorInset': '0.5rem',
                    '--Step-connectorRadius': '1rem',
                    '--Step-connectorThickness': '4px',
                    '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
                    [`& .${stepClasses.completed}`]: {
                        '&::after': { bgcolor: 'success.solidBg' },
                    },
                    [`& .${stepClasses.active}`]: {
                        [`& .${stepIndicatorClasses.root}`]: {
                            border: '4px solid',
                            borderColor: '#fff',
                            boxShadow: (theme) => `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                        },
                    },
                    [`& .${stepClasses.disabled} *`]: {
                        color: 'neutral.softDisabledColor',
                    },
                    [`& .${typographyClasses['title-sm']}`]: {
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '10px',
                    },
                }}
            >
                {data.map((i: any) => {
                    return (
                        <Step
                            key={i}
                            indicator={
                                <StepIndicator variant="solid" color="success">
                                    {i.state === "Delivered" ? <DeliveryDining /> : i.state === "Pick Up" ? <SentimentSatisfied /> : <Cancel />}
                                </StepIndicator>
                            }
                        >
                            <div>
                                <Typography level="title-sm">{i.activity} <Typography sx={{ float: "inline-end" }}>{i.date}</Typography></Typography>
                                {i.state}
                            </div>
                        </Step>
                    )
                })}

            </Stepper>
        </Paper>

    )
}