import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCategory } from "../../actions/categoryAction";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import {MdSpellcheck} from "react-icons/md";
import SideBar from "./SideBar";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader/Loader"

const NewCategory = () => {

    const toastOptions = {
        position: "bottom-center",
        autoClose: 3001,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }; 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector((state) => state.newCategory);

    const [name, setName] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error, toastOptions);
            dispatch(clearErrors());
            <ToastContainer />
        }

        if (success) {
            toast.success("Category Created Successfully", toastOptions);
            navigate("/admin/dashboard");
            dispatch({ type: NEW_CATEGORY_RESET });
            <ToastContainer />
        }
    }, [dispatch, error, success]);

    const createCategorySubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        
        dispatch(createCategory(myForm));
    };

    return (
    <Fragment>
        <MetaData title="Create Category" />
        <div className="dashboard">
            <SideBar />
            {loading? <Loader/> : (
            <div className="newProductContainer">
                <form className="createProductForm" encType="multipart/form-data" onSubmit={createCategorySubmitHandler}>
                    <h1>Create Category</h1>
                    <div>
                        <MdSpellcheck />
                        <input type="text" placeholder="Category Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    
                    <Button id="createProductBtn" type="submit" disabled={loading ? true : false}>
                        Create
                    </Button>
                </form>
            </div>
            )}
        </div>
    </Fragment>
    );
};

export default NewCategory;