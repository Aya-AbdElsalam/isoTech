import { Box, Stack } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    background: "transparent",
    padding: "10px"
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid black',
}));
export default function FaqComponent(props: { dir: any, q1: string, a1: string, q2: string, a2: string, q3: string, a3: string, q4: string, a4: string, img?: string }) {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    return (
        <Stack direction={props.dir} flexWrap={"wrap"} gap={4} justifyContent={"center"} >
            <Box width={"400px"} flexGrow={1}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                        <Typography fontWeight={"bold"} fontSize={"20px"}>{props.q1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color={"var(--txt--second)"} lineHeight={1.8}>
                            {props.a1}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" >
                        <Typography fontWeight={"bold"} fontSize={"20px"}>{props.q2}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color={"var(--txt--second)"} lineHeight={1.8}>
                            {props.a2}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" >
                        <Typography fontWeight={"bold"} fontSize={"20px"}>{props.q3}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color={"var(--txt--second)"} lineHeight={1.8}>
                            {props.a3}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" >
                        <Typography fontWeight={"bold"} fontSize={"20px"}>{props.q4}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color={"var(--txt--second)"} lineHeight={1.8}>
                            {props.a4}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
            {props.img && <Box width={"400px"} flexGrow={.5}>
                <img loading="lazy" src={props.img} style={{ width: "100%" }} alt="faq" />
            </Box>}

        </Stack>
    )
}