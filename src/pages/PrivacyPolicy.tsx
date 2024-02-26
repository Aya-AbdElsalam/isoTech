import { Box, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Title from "../component/Title";
function createData(
    Category: string[],
    CategoriesofRecipients: string[]
) {
    return { Category, CategoriesofRecipients };
}
const rows = [
    createData(["Identifiers such as basic contact details and certain order and account information", "Commercial information such as order information, shopping information and customer support information", "Internet or other similar network activity, such as Usage Data"], ["Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers)", "Business and marketing partners", "Affiliates"])
];
export default function PrivacyPolicy() {
    return (
        <>
            <Title title={"Privacy policy"} />
            <Box sx={{ px: { md: "21%", xs: "5%" } }} my="80px" fontSize={"16px"} color={"var(--txt--second)"} >
                <Stack gap={3}>
                    <Typography lineHeight={1.8} sx={{ fontStyle: "italic" }} fontWeight={"bold"}>
                        [NOTE TO MERCHANT: This is a template Privacy Policy designed to cover your collection, use, and disclosure of personal information about visitors and customers of your Shopify-powered Site. Please review and customize the content so that it is tailored to your store and business practices regarding how you collect, use, and disclose personal data. For example, you may need to update the template content if: you are based in certain jurisdictions (particularly to reflect certain disclosures that are required under GDPR), you collect information from other sources like third parties or offline; you disclose information to additional service providers or business partners; or you add third-party cookies or other analytics tools. Please also remember to delete all "Note to Merchant" drafting notes prior to publishing.]
                    </Typography>
                    <Typography lineHeight={1.8}>
                        This Privacy Policy describes how IsoTech - Shopify Theme, Password: 1 (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from isotech-demo.myshopify.com (the "Site") or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Changes to This Privacy Policy
                    </Typography>
                    <Typography lineHeight={1.8}>
                        We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        How We Collect and Use Your Personal Information
                    </Typography>
                    <Typography lineHeight={1.8}>
                        To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
                    </Typography>
                    <Typography lineHeight={1.8}>
                        In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        What Personal Information We Collect
                    </Typography>
                    <Typography lineHeight={1.8}>
                        The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Information We Collect Directly from You
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Information that you directly submit to us through our Services may include:
                    </Typography>
                    <ul style={{ fontSize: "16px", fontFamily: "Roboto", lineHeight: "1.7", margin: "0", paddingTop: "0" }}>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Basic contact details
                            </Typography>   including your name, address, phone number, email.
                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Order information including                            </Typography>
                            your name, billing address, shipping address, payment confirmation, email address, phone number.                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Account information including                            </Typography>
                            your username, password, security questions.
                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Shopping information including                            </Typography>
                            the items you view, put in your cart or add to your wishlist.                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Customer support information including                   </Typography>
                            the information you choose to include in communications with us, for example, when sending a message through the Services.                        </li>
                    </ul>
                    <Typography lineHeight={1.8}>
                        Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.

                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Information We Collect through Cookies
                    </Typography>
                    <Typography lineHeight={1.8}>
                        We also automatically collect certain information about your interaction with the Services ("Usage Data"). To do this, we may use cookies, pixels and similar technologies ("Cookies"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.


                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Information We Obtain from Third Parties
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:
                    </Typography>
                    <ul style={{ fontSize: "16px", fontFamily: "Roboto", lineHeight: "1.7", margin: "0", paddingTop: "0" }}>
                        <li>
                            Companies who support our Site and Services, such as Shopify.
                        </li>
                        <li>
                            Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.
                        </li>
                        <li>
                            When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.
                        </li>
                    </ul>
                    <Typography lineHeight={1.8}>
                        Any information we obtain from third parties will be treated in accordance with this Privacy Policy. We are not responsible or liable for the accuracy of the information provided to us by third parties and are not responsible for any third party's policies or practices. For more information, see the section below, Third Party Websites and Links.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        How We Use Your Personal Information
                    </Typography>

                    <ul style={{ fontSize: "16px", fontFamily: "Roboto", lineHeight: "1.7", margin: "0", paddingTop: "0" }}>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Basic contact details
                            </Typography>   including your name, address, phone number, email.
                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Providing Products and Services.                            </Typography>
                            We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to you account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and to enable you to post reviews.
                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Marketing and Advertising.                          </Typography>
                            We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites.
                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Shopping information including                            </Typography>
                            the items you view, put in your cart or add to your wishlist.                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Security and Fraud Prevention.                   </Typography>
                            We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately.                       </li>
                    </ul>
                    <Typography lineHeight={1.8}>
                        Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Cookies                    </Typography>
                    <Typography lineHeight={1.8}>
                        Like many websites, we use Cookies on our Site. For specific information about the Cookies that we use related to powering our store with Shopify, see https://www.shopify.com/legal/cookies. We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites.
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        How We Disclose Personal Information
                    </Typography>
                    <Typography lineHeight={1.8}>
                        In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:

                    </Typography>
                    <ul style={{ fontSize: "16px", fontFamily: "Roboto", lineHeight: "1.7", margin: "0", paddingTop: "0" }}>
                        <li>
                            With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).
                        </li>
                        <li>
                            With business and marketing partners, including Shopify, to provide services and advertise to you. [NOTE TO MERCHANT: INSERT THE FOLLOWING SENTENCE IF USING SHOPIFY’S AD SERVICES, SUCH AS SHOPIFY AUDIENCES] [For example, we use Shopify to support personalized advertising with third-party services]. Our business and marketing partners will use your information in accordance with their own privacy notices.
                        </li>
                        <li>
                            When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.
                        </li>
                        <li>
                            With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.
                        </li>
                        <li>
                            In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
                        </li>
                    </ul>
                    <Typography lineHeight={1.8}>
                        We have, in the past 12 months disclosed the following categories of personal information and sensitive personal information (denoted by *) about users for the purposes set out above in "How we Collect and Use your Personal Information" and "How we Disclose Personal Information":
                    </Typography>
                    <TableContainer sx={{ border: "1px solid var(--txt--second)" }}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ border: "1px solid var(--txt--second)" }}>
                                <TableRow  >
                                    <TableCell sx={{ fontFamily: "Roboto", fontSize: "16px", border: "1px solid var(--txt--second)" }}>Category</TableCell>
                                    <TableCell sx={{ fontFamily: "Roboto", fontSize: "16px", border: "1px solid var(--txt--second)" }}>Categories of Recipients</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ border: "1px solid var(--txt--second)" }}>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ border: "1px solid var(--txt--second)" }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <ul style={{ fontSize: "14px", fontFamily: "Roboto", lineHeight: "1.7", margin: "0", paddingTop: "0" }}>
                                                {row.Category.map((i) => {
                                                    return (
                                                        <li key={i}>{i}</li>
                                                    )
                                                })}
                                            </ul>
                                        </TableCell>
                                        <TableCell component="th" scope="row" sx={{ border: "1px solid var(--txt--second)" }}>
                                            <ul style={{ fontSize: "14px", fontFamily: "Roboto", lineHeight: "1.7", margin: "0", paddingTop: "0" }}>
                                                {row.CategoriesofRecipients.map((i) => {
                                                    return (
                                                        <li key={i}>{i}</li>
                                                    )
                                                })}
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        User Generated Content
                    </Typography>
                    <Typography lineHeight={1.8}>
                        The Services may enable you to post product reviews and other user-generated content. If you choose to submit user generated content to any public area of the Services, this content will be public and accessible by anyone.
                    </Typography>
                    <Typography lineHeight={1.8}>
                        We do not control who will have access to the information that you choose to make available to others, and cannot ensure that parties who have access to such information will respect your privacy or keep it secure. We are not responsible for the privacy or security of any information that you make publicly available, or for the accuracy, use or misuse of any information that you disclose or receive from third parties.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Third Party Websites and Links
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Children’s Data
                    </Typography>
                    <Typography lineHeight={1.8}>
                        The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.
                    </Typography>
                    <Typography lineHeight={1.8}>
                        As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
                    </Typography>
                    <Typography lineHeight={1.8}>
                        [NOTE TO MERCHANT: PLEASE CONSULT WITH LEGAL COUNSEL IF YOUR SITE IS CHILD FOCUSSED OR DIRECTED, AS MORE SPECIFIC DISCLOSURES MAY BE REQUIRED.]
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Security and Retention of Your Information
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.
                    </Typography>
                    <Typography lineHeight={1.8}>
                        How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
                    </Typography>

                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Your Rights and Choices
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.

                    </Typography>
                    <ul style={{ fontSize: "16px", fontFamily: "Roboto", lineHeight: "1.7", margin: "0", paddingTop: "0" }}>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Right to Access / Know.                             </Typography>  You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.
                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Right to Delete.                         </Typography>
                            You may have a right to request that we delete personal information we maintain about you.                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Right to Correct.                         </Typography>
                            You may have a right to request that we correct inaccurate personal information we maintain about you.                        </li>
                        <li>
                            <Typography display={"inline-block"} fontWeight={"bold"}>
                                Right of Portability.                         </Typography>
                            You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.                       </li>
                    </ul>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Complaints                    </Typography>
                    <Typography lineHeight={1.8}>
                        If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority.


                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        International Users
                    </Typography>
                    <Typography lineHeight={1.8}>
                        Please note that we may transfer, store and process your personal information outside the country you live in, including the United States. Your personal information is also processed by staff and third party service providers and partners in these countries.

                        If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.
                    </Typography>
                    <Typography fontWeight={"bold"} mb={"10px"} mt={"30px"} color={"black"} variant={"h5"}>
                        Contact                    </Typography>
                    <Typography lineHeight={1.8}>
                        Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call [TOLL FREE TELEPHONE NUMBER IF YOU HAVE A PHYSICAL RETAIL LOCATION] or email us at mohinpatwary42@gmail.com or contact us at Bangladesh.


                    </Typography>
                    <Typography lineHeight={1.8} fontWeight={"bold"}>
                        [NOTE TO MERCHANT: INSERT THE FOLLOWING IF YOUR SITE IS GOVERNED BY GDPR] For the purpose of applicable data protection laws, we are the data controller of your personal information. Our representative in the [EEA] [and] [the UK] is [INSERT REPRESENTATIVE DETAILS].



                    </Typography>
                </Stack>

            </Box>
        </>
    )
}