import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data.user));
    } catch (error) {
        dispatch(loginFailure());
    }
};
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data.products));
    } catch (error) {
        dispatch(getProductFailure);
    }
};
export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        // const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure);
    }
};
export const updateProducts = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess(id, res.data.updatedProduct));
    } catch (error) {
        dispatch(updateProductFailure);
    }
};
export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products/`, product);
        dispatch(addProductSuccess(res.data.savedProduct));
    } catch (error) {
        dispatch(addProductFailure);
    }
};
