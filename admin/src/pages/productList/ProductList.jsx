import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
    const products = useSelector((state) => state.product.products);

    const dispatch = useDispatch();
    React.useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProducts(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img
                            className="productListImg"
                            src={params.row.img}
                            alt=""
                        />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "inStock", headerName: "Stock", width: 150 },
        {
            field: "price",
            headerName: "Price",
            width: 150,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="productList">
                    <DataGrid
                        rows={products}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={8}
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    );
}
