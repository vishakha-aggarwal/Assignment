import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateCategory, getCategoryDetails} from "../../actions/categoryAction";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import {MdSpellcheck} from "react-icons/md";
import SideBar from "./SideBar";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader/Loader"



const UpdateCategory = () => {
    
    const toastOptions = {
        position: "bottom-center",
        autoClose: 3001,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }; 

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, category } = useSelector((state) => state.categoryDetails);
    const { loading, error: updateError,isUpdated} = useSelector((state) => state.category);

    const [name, setName] = useState("");
    
    const categoryId = id;

    useEffect(() => {
        if (category && category._id !== categoryId) 
            dispatch(getCategoryDetails(categoryId));
        else {
            setName(category.name);
        }
        if (error) {
            toast.error(error, toastOptions);
            dispatch(clearErrors());
            <ToastContainer />
        }

        if (updateError) {
            toast.error(updateError, toastOptions);
            dispatch(clearErrors());
            <ToastContainer />
        }

        if (isUpdated) {
            toast.success("Category Updated Successfully", toastOptions);
            navigate("/admin/category/all");
            dispatch({ type: UPDATE_CATEGORY_RESET });
            <ToastContainer />
        }
    }, [dispatch, error,isUpdated, categoryId, category, updateError]);

    const updateCategorySubmitHandler = (e) => {
        
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        dispatch(updateCategory(categoryId, myForm));
    };

    return (
    <Fragment>
        <MetaData title="Update Category" />
        <div className="dashboard">
            <SideBar />
            {loading ? <Loader /> : (
            <div className="newProductContainer">
                <form className="createProductForm" encType="multipart/form-data" onSubmit={updateCategorySubmitHandler}>
                    <h1>Update Category</h1>

                    <div>
                        <MdSpellcheck />
                        <input type="text" placeholder="Category Name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    
                    <Button id="createProductBtn" type="submit" disabled={loading ? true : false}>
                        Update
                    </Button>
                </form>
            </div>
            )}
        </div>
    </Fragment>
    );
};

export default UpdateCategory;