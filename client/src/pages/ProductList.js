import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
    margin: 20px;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
    font-style: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
    padding: 5px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

export const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = React.useState({});
    const [sort, setSort] = React.useState("newest");

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilter}>
                        <Option disabled selected value={null}>
                            -- Color --
                        </Option>
                        <Option value="white">White</Option>
                        <Option value="black">Black</Option>
                        <Option value="red">Red</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="yellow">Yellow</Option>
                        <Option value="green">Green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilter}>
                        <Option disabled selected value={null}>
                            -- Size --
                        </Option>
                        <Option value="XL">XL</Option>
                        <Option value="X">X</Option>
                        <Option value="XS">XS</Option>
                        <Option value="L">L</Option>
                        <Option value="M">M</Option>
                        <Option value="S">S</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option selected value="newest">
                            Newest
                        </Option>
                        <Option value="asc">Price (ASC)</Option>
                        <Option value="desc">Price (DESC)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    );
};
export default ProductList;
