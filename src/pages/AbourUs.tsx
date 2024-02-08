import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Title from "../component/Title";
import SubTitle from "../component/SubTitle";
import about from "../images/106446-OMWRQS-360.webp";
import deal from "../images/handshake-businessmen_1098-742 (1).avif"
import { Link } from "react-router-dom";
import best from "../images/43036-[Converted].webp"
import Team from "../component/Team";
import { AirportShuttle, Chat, KeyboardReturn, Payment } from "@mui/icons-material";
import FeedBack from "../component/Feedback";
export default function AboutUs() {

    return (
        <>
            <Title title="About Us" />
            <Container sx={{ my: "60px" }}>
                <Stack direction={"row"} flexWrap={"wrap"}>
                    <Box width={"400px"} flexGrow={2}>
                        <SubTitle title="Story About Us" txt={"left"} />
                        <Typography color={"var(--txt--second)"}>
                            Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.
                        </Typography>
                        <SubTitle title="Alex Turner" txt={"left"} />
                        <Typography color={"var(--txt--second)"}>
                            Founder</Typography>
                    </Box>
                    <Box width={"300px"} flexGrow={1}>
                        <img loading="lazy" src={about} style={{ width: "100%" }} alt="about" />
                    </Box>
                </Stack>
            </Container>
            <Box position={"relative"} sx={{ backgroundImage: `url("${deal}")`, backgroundSize: "cover", backgroundAttachment: "fixed" }}>
                <Box position={"absolute"} top={0} left={0} width={"100%"} height={"100%"} sx={{ background: "black", opacity: "75%" }} >
                </Box>
                <Container sx={{ display: "flex", flexWrap: "wrap", textAlign: "center", gap: "50px", py: "40px" }} >
                    <Box fontWeight={"bold"} color={"white"} width={"200px"} position={"relative"} flexGrow={1}>
                        <Typography fontSize={"25px"} sx={{ textWrap: "nowrap" }}>
                            Happy clients
                        </Typography>
                        <Typography fontSize={"30px"}>
                            600
                        </Typography>
                    </Box>
                    <Box fontWeight={"bold"} position={"relative"} color={"white"} width={"200px"} flexGrow={1}>
                        <Typography fontSize={"25px"} sx={{ textWrap: "nowrap" }}>
                            Total Products
                        </Typography>
                        <Typography fontSize={"30px"}>
                            1000
                        </Typography>
                    </Box>
                    <Box fontWeight={"bold"} position={"relative"} color={"white"} width={"200px"} flexGrow={1}>
                        <Typography fontSize={"25px"} sx={{ textWrap: "nowrap" }}>
                            Team Members
                        </Typography>
                        <Typography fontSize={"30px"}>
                            50
                        </Typography>
                    </Box>
                    <Box fontWeight={"bold"} position={"relative"} color={"white"} width={"200px"} flexGrow={1}>
                        <Typography fontSize={"25px"} sx={{ textWrap: "nowrap" }}>
                            Monthly Orders
                        </Typography>
                        <Typography fontSize={"30px"}>
                            200
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Container >
                <Stack direction={"row"} gap={{ md: 4, xs: 0 }} flexWrap={"wrap"}>
                    <Box width={"300px"} flexGrow={1} >
                        <img loading="lazy" src={best} style={{ width: "100%" }} alt="" />
                    </Box>
                    <Box width={"400px"} flexGrow={2} my={{ xs: "0px", md: "80px" }} mb={{ xs: "40px", md: "0" }}>
                        <SubTitle title="Our Best Product" left="left" />
                        <Typography color={"var(--txt--second)"} mb={"30px"}>
                            Customer feedback is highly valued at Company XYZ. The company actively listens to its customers, taking note of their suggestions and needs. This customer-centric approach allows the company to continually improve its products, ensuring they remain relevant and meet the evolving demands of the market.
                        </Typography>
                        <Link to={"Shop"} >
                            <Button aria-labelledby="explore" sx={{
                                background: "var(--btn--main)", color: "var(--btn--txt)", '&:hover': {
                                    background: "var(--btn--hover)"
                                },
                            }}>
                                Explore More
                            </Button>
                        </Link>
                    </Box>
                </Stack>
                <Box marginY={"100px"}>
                    <SubTitle txt="center" title="Our Team" left={"41%"} />
                    <Team />

                </Box>
                <Box marginY={"100px"}>
                    <SubTitle txt="center" title="Customers Feedback" left={"41%"} />
                    <FeedBack />

                </Box>
                <Stack direction={"row"} flexWrap={"wrap"} my={"80px"} gap={7}>
                    <Box width={"200px"} flexGrow={1}>
                        <Stack direction={"row"} gap={2}>
                            <AirportShuttle sx={{ fontSize: "40px" }} />
                            <Box >
                                <Typography fontWeight={"bold"} fontSize={"20px"}>
                                    Free Shipping
                                </Typography>
                                <Typography color={"var(--txt--second)"}>
                                    Free Shipping for orders over $100
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box width={"200px"} flexGrow={1}>
                        <Stack direction={"row"} gap={2}>
                            <KeyboardReturn sx={{ fontSize: "40px" }} />
                            <Box >
                                <Typography fontWeight={"bold"} fontSize={"20px"}>
                                    Free Returns
                                </Typography>
                                <Typography color={"var(--txt--second)"}>
                                    Within 30 days for an Returns.

                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box width={"200px"} flexGrow={1}>
                        <Stack direction={"row"} gap={2}>
                            <Payment sx={{ fontSize: "40px" }} />
                            <Box >
                                <Typography fontWeight={"bold"} fontSize={"20px"}>
                                    Secure Payment
                                </Typography>
                                <Typography color={"var(--txt--second)"}>
                                    Within 30 days for an exchange.
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box width={"200px"} flexGrow={1}>
                        <Stack direction={"row"} gap={2}>
                            <Chat sx={{ fontSize: "40px" }} />
                            <Box >
                                <Typography fontWeight={"bold"} fontSize={"20px"}>
                                    Online Support
                                </Typography>
                                <Typography color={"var(--txt--second)"}>
                                    24 hours a day, 7 days a week
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}