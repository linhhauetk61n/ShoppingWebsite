import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
    margin: 20px 0;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`;
const Title = styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
const Right = styled.div`
    flex: 1;
    padding: 20px;
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Vintage Boutique</Logo>
                <Desc>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="385999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="e4405f">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55acee">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="e60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Tearms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact us</Title>
                <ContactItem>
                    <Room style={{ marginRight: "20px" }} />
                    Số 23, ngõ 50 Đình Thôn, phường Mỹ Đình 1, quận Nam Từ Liêm,
                    Hà Nội
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "20px" }} /> SĐT: 0333511100
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "20px" }} />
                    Gmail: linhhauetk61n@gmail.com
                </ContactItem>
            </Right>
        </Container>
    );
};

export default Footer;
