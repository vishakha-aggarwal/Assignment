import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors, getAllCategory, deleteCategory } from "../../actions/categoryAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import {MdEdit, MdDelete} from "react-icons/md";
import SideBar from "./SideBar";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CategoryList = () => {

    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-center",
        autoClose: 3001,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }; 

    const dispatch = useDispatch();
    const { error, categories } = useSelector((state) => state.categories);
    const { error: deleteError, isDeleted } = useSelector((state) => state.category);

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, toastOptions);
            dispatch(clearErrors());
            <ToastContainer />
        }

        if (deleteError) {
            toast.error(deleteError, toastOptions);
            dispatch(clearErrors());
            <ToastContainer />

        }

        if (isDeleted) {
            toast.success("Category Deleted Successfully", toastOptions);
            navigate("/admin/category/all");
            dispatch({ type: DELETE_CATEGORY_RESET });
            <ToastContainer />
        }
        dispatch(getAllCategory());
    }, [dispatch, error, deleteError, isDeleted]);

    const columns = [
        { field: "id", headerName: "Category ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Category Name",
            minWidth: 350,
            flex: 2
        },
        {
            field: "actions",
            flex: 1,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
                            <MdEdit />
                        </Link>

                        <Button onClick={() => deleteCategoryHandler(params.getValue(params.id, "id"))} >
                            <MdDelete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    categories &&
        categories.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL CATEGORIES - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL CATEGORIES</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            <ToastContainer />

            </div>
        </Fragment>
    );
};

export default CategoryList;