import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,

    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_SUCCESS,

    CLEAR_ERRORS

} from "../constants/categoryConstants";

import axios from "axios";


// Clearing all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Get All Category For Admin
export const getAllCategory = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });
        const config = { method: "GET", headers: { "Content-Type": "application/json" }, withCredentials: 'true', credentials: 'include' };
        const api = "http://localhost:3001";
        const { data } = await axios.get(api + "/api/v1/category/all", config);
        // console.log(data);
        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data.allCategory,
        });
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create Product
export const createCategory = (categoryData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });
        const config = { method: "POST", headers: { "Content-Type": "application/json" }, withCredentials: 'true', credentials: 'include' };
        const api = "http://localhost:3001";
        const { data } = await axios.post(api + "/api/v1/admin/category/create", categoryData, config);
        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

//get product details
export const getCategoryDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_DETAILS_REQUEST });
      let api = "http://localhost:3001";
      let link = "/api/v1/admin/category/";
      const { data } = await axios.get(api+link+id);
  
      dispatch({
        type: CATEGORY_DETAILS_SUCCESS,
        payload: data.category,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Product
export const deleteCategory = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });
        const config = { method: "DELETE", headers: { "Content-Type": "application/json" }, withCredentials: 'true', credentials: 'include' };
        const api = "http://localhost:3001";
        const { data } = await axios.delete(api + `/api/v1/admin/category/${id}`, config);
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Product
export const updateCategory = (id, categoryData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        const config = { method: "PUT", headers: { "Content-Type": "application/json" }, withCredentials: 'true', credentials: 'include' };
        const api = "http://localhost:3001";
        const { data } = await axios.put(api + `/api/v1/admin/category/${id}`, categoryData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};
