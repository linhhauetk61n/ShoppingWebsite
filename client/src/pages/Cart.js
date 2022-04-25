import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const CartContainer = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
    flex: 3;
`;
const Product = styled.div`
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 5px;
    background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
    flex: 1;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;
const SummaryTitle = styled.div`
    font-weight: 500;
    font-size: 34px;
`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.div``;
const SummaryItemPrice = styled.div``;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

export const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = React.useState(null);
    let navigate = useNavigate();
    const onToken = (token) => {
        setStripeToken(token);
    };
    React.useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });

                navigate("/success", {
                    state: {
                        stripeData: res.data,
                        products: cart,
                    },
                });
            } catch (error) {}
        };
        stripeToken && makeRequest();
    }, [stripeToken, navigate, cart.total, cart]);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <CartContainer>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Your Wishlist (2)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products?.map((product) => (
                            <Product key={product._id}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product._id}
                                        </ProductId>
                                        <b>Color:</b>
                                        <ProductColor color={product.color} />
                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add />
                                        <ProductAmount>
                                            {product.quantity}
                                        </ProductAmount>
                                        <Remove />
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {product.price * product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Estimated Shipping
                            </SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Vintage Boutique Shop"
                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </CartContainer>
            <Footer />
        </Container>
    );
};
export default Cart;
