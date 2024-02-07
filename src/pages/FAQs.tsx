import { Container } from "@mui/material";
import SubTitle from "../component/SubTitle";
import Title from "../component/Title";
import FaqComponent from "../component/FaqComponent";
import faqShopping from "../images/2358405.webp"
import faqPayment from "../images/2760424.webp"
export default function FAQs() {

    return (
        <>
            <Title title={"FAQs"} />
            <SubTitle title="Shopping Information" left="41%" txt={"center"} />
            <Container sx={{ mb: "80px" }}>
                <FaqComponent dir={"row"} q1={"How can I place an order?"}
                    a1={"To place an order, simply browse our online store and add the desired items to your shopping cart. Proceed to the checkout page, where you'll enter your shipping and payment details. Once confirmed, your order will be processed, and you'll receive a confirmation email."}
                    q2={"What payment methods do you accept?"}
                    a2={"We accept various payment methods, including credit/debit cards (Visa, MasterCard, American Express), PayPal, and other secure online payment gateways. Some regions may have additional local payment options available."}
                    q3={"Do you offer international shipping"}
                    a3={"Yes, we do offer international shipping to many countries. During the checkout process, you can select your country to check for shipping availability and associated costs."}
                    q4={"What are your shipping times?"}
                    a4={"Shipping times depend on your location and the shipping method chosen. Generally, we strive to process orders within 1-3 business days, but actual delivery times may vary. During checkout, you'll be provided with an estimated delivery date."}
                    img={faqShopping} />
                <SubTitle title="Payment Information" left="41%" txt={"center"} />
                <FaqComponent dir={"row-reverse"} q1={"What payment methods do you accept?"}
                    q2="Is my payment information secure?"
                    q3="Do you accept payment in multiple currencies?"
                    q4="Can I request a refund for my payment?"
                    a1="We accept various payment methods, including credit cards, debit cards, PayPal, and other secure online payment gateways. Some regions may have additional local payment options available."
                    a2="Yes, we take the security of your payment information seriously. Our website uses encrypted connections (SSL) to protect your personal and payment details, ensuring a safe and secure transaction"
                    a3="Our website may support payment in multiple currencies, depending on your location and the available payment methods. During checkout, you can select your preferred currency if applicable."
                    a4="Refund eligibility depends on the nature of your purchase and our refund policy. If you believe you are entitled to a refund, please refer to our Returns & Refunds page or contact our customer support for assistance."
                    img={faqPayment} />
                <SubTitle title="Order & Returns" left="41%" txt={"center"} />
                <FaqComponent
                    dir={"row"}
                    q1="How long does it take to process an order?"
                    q2="Do you offer international shipping?"
                    q3="What is your return policy?"
                    q4="Can I exchange an item instead of returning it?"
                    a1="Order processing times may vary depending on the product and its availability. In general, we strive to process orders within 1-3 business days. However, during peak seasons or special promotions, processing times may be slightly longer."
                    a2="Yes, we offer international shipping to many countries. During the checkout process, you can select your country to check for shipping availability and associated costs."
                    a3="Our return policy allows you to return eligible items within a specified period from the date of delivery. To be eligible for a return, the item must be in its original condition, unused, and in the original packaging. Certain items, such as personalized or intimate goods, may not be eligible for return due to hygiene reasons."
                    a4="Yes, we offer exchanges for eligible items. If you wish to exchange an item for a different size, color, or variant, please contact our customer support team for assistance."
                />

            </Container>

        </>

    )
}