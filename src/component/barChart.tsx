import { Typography } from '@mui/joy'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';


export default function BarChart() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://isotechdata.onrender.com/barChart").then((res) => res.json()).then((data) => setData(data))
    }, [])
    console.log(data)
    return (
        <Paper sx={{ width: "200px", flexGrow: 2, height: "500px", padding: "10px", boxSizing: "border-box", fontSize: "7px" }} >
            <Typography fontWeight={"bold"} >Sales Statistics</Typography>
            <ResponsiveBar
                data={data}
                keys={[
                    'Order',
                    'Pending',
                    'Cancelled',
                    'Delivered'
                ]}
                indexBy="country"
                margin={{ top: 50, bottom: 50 }}
                padding={0.3}
                colors={{ scheme: 'blues' }}

                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: ' Cancelled'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </Paper>

    )
}