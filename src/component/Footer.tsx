import { ArrowDropDown, ArrowForward, Email } from "@mui/icons-material";
import { Box, Container, IconButton, InputBase, List, ListItem, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
function ListFooter() {
    return (
        <List sx={{ fontSize: "18px" }}>

            <ListItem sx={{
                '&:hover': {
                    color: "var( --txt--hover)", fontWeight: "bold"
                },
                color: "--txt--second"
            }}>
                <Link to={"FAQs"}>
                    FAQs
                </Link>
            </ListItem>
            <ListItem sx={{
                '&:hover': {
                    color: "var( --txt--hover)", fontWeight: "bold"

                },
                color: "--txt--second"
            }}>            <Link to={"Findstorelocation"}>

                    Find store location            </Link>

            </ListItem>
            <ListItem sx={{
                '&:hover': {
                    color: "var( --txt--hover)", fontWeight: "bold"

                },
                color: "--txt--second"
            }}>            <Link to={"PrivacyPolicy"}>

                    Privacy Policy            </Link>

            </ListItem>
            <ListItem sx={{
                '&:hover': {
                    color: "var( --txt--hover)", fontWeight: "bold"
                },
                color: "--txt--second",

            }}>            <Link to={"TermsofService"}>

                    Terms of Service            </Link>

            </ListItem>
        </List>
    )
}
function ListFooterCompany() {
    return (
        <List sx={{ fontSize: "18px" }}>
            <ListItem sx={{
                '&:hover': {
                    color: "var( --txt--hover)",
                    fontWeight: "bold"
                },
                color: "--txt--second"
            }}>            <Link to={"wishList"}>

                    Whish list            </Link>

            </ListItem>
            <ListItem sx={{
                '&:hover': {
                    color: "var( --txt--hover)",
                    fontWeight: "bold"

                },
                color: "--txt--second"
            }}>            <Link to={"cart"}>

                    Cart            </Link>

            </ListItem>
            <ListItem sx={{
                '&:hover': {
                    color: "var( --txt--hover)",
                    fontWeight: "bold"

                },
                color: "--txt--second"
            }}>            <Link to={"About us"}>

                    About Us            </Link>

            </ListItem>
        </List>
    )
}
function ListFooterNews() {
    return (<> <Typography my={2} color={"--txt--second"}>Write your email first to know about any information
    </Typography>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
            <IconButton sx={{ p: '10px' }} aria-labelledby="email">
                <Email id="email" />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Your Email"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <ArrowForward />
            </IconButton>

        </Paper>
    </>
    )
}
export default function Footer() {
    return (
        <Box sx={{ background: "var(--bg--second)" }} width={"100%"} py={"80px"}>
            <Container sx={{ display: { md: "flex", xs: "none" }, flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }} >
                <Box width={"270px"} >
                    <Typography fontSize={"20px"} sx={{ fontWeight: "bold" }}>About us
                    </Typography>
                    <Typography my={2} color={"--txt--second"}>The exciting contemporary brand Suruchi is known for its attention to detail and premium graphics.
                    </Typography>
                </Box>
                <Box width={"250px"} >
                    <Typography fontSize={"20px"} sx={{ fontWeight: "bold" }}>Quick Links
                    </Typography>
                    <ListFooter />
                </Box>
                <Box width={"230px"}>
                    <Typography fontSize={"20px"} sx={{ fontWeight: "bold" }}>Company
                    </Typography>
                    <ListFooterCompany />
                </Box>
                <Box width={"270px"} >
                    <Typography fontSize={"20px"} sx={{ fontWeight: "bold" }}>Newsletter
                    </Typography>
                    <ListFooterNews />
                </Box>

            </Container>
            <Container sx={{ display: { md: "none", xs: "flex", flexWrap: "wrap", flexDirection: "column", gap: "10px" } }} >
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ArrowDropDown />}
                    >
                        <Typography fontSize="19px" sx={{ fontWeight: "500px" }}>About us </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography my={2} color={"--txt--second"}>The exciting contemporary brand Suruchi is known for its attention to detail and premium graphics.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDown />}
                    >
                        <Typography fontSize="19px" sx={{ fontWeight: "500px" }}>Quick Links </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListFooter />
                    </AccordionDetails>
                </Accordion>
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ArrowDropDown />}
                    >
                        <Typography fontSize="19px" sx={{ fontWeight: "500px" }}>Company </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListFooterCompany />
                    </AccordionDetails>
                </Accordion>
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ArrowDropDown />}
                    >
                        <Typography fontSize="19px" sx={{ fontWeight: "500px" }}>Newsletter </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListFooterNews />
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Box>
    )
}