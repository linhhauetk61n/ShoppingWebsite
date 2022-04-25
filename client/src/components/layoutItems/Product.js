import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    z-index: 3;
    transition: all 0.5s ease;
`;
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info} {
        opacity: 1;
    }
`;
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;
const Image = styled.img`
    height: 75%;
    z-index: 1;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        background-color: #e9f5fe;
        transform: scale(1.2);
    }
`;

const Product = ({ item }) => {
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
        </Container>
    );
};

export default Product;
