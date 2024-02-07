import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
export default function CardDashboard(props: { icon: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
    return (
        <Card variant="solid" color={"neutral"} invertedColors sx={{ width: "210px", flexGrow: "1", "&:hover": { backgroundColor: "var(--btn--main)" } }}>
            <CardContent orientation="horizontal">
                <CircularProgress size="lg" determinate>
                    {props.icon}
                </CircularProgress>
                <CardContent>
                    <Typography level="body-md">{props.title}</Typography>
                    <Typography level="h2">{props.value}</Typography>
                </CardContent>
            </CardContent>

        </Card>
    );
}