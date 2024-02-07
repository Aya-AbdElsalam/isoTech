import { Container } from "@mui/material";
import SubTitle from "../component/SubTitle";
import Title from "../component/Title";
import LocationComponent from "../component/LocationComponent";

export default function Findstorelocation() {
    return (
        <>
            <Title title="Find store location" />
            <Container sx={{ mb: "80px" }}>
                <SubTitle title="New York Warehouse" left="41%" txt={"center"}/>
                <LocationComponent dir={"row"} address="123 Stree New York City , United States Of America NY 750065." phone="(372) 587-2335" email="info@example.com"
                    map={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19056.005897173953!2d-6.259336!3d53.343243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9b76719607%3A0x9d13471d963893a7!2s1%20Grafton%20Street%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sus!4v1705845104296!5m2!1sen!2sus"} />
                <SubTitle title="Germany Warehouse" left="41%" txt={"center"}/>
                <LocationComponent dir={"row-reverse"} address="123 Stree New York City , United States Of America NY 750065." phone="(372) 587-2335" email="info@example.com"
                    map={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19056.005897173953!2d-6.259336!3d53.343243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9b76719607%3A0x9d13471d963893a7!2s1%20Grafton%20Street%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sus!4v1705845104296!5m2!1sen!2sus"} />
                <SubTitle title="Franch Warehouse" left="41%" txt={"center"}/>
                <LocationComponent dir={"row"} address="123 Stree New York City , United States Of America NY 750065." phone="(372) 587-2335" email="info@example.com"
                    map={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19056.005897173953!2d-6.259336!3d53.343243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9b76719607%3A0x9d13471d963893a7!2s1%20Grafton%20Street%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sus!4v1705845104296!5m2!1sen!2sus"} />
            </Container>
        </>
    )
}