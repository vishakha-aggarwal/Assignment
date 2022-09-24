import React, { useEffect } from "react";
import Sidebar from "./SideBar.js";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { getAdminProduct } from "../../actions/productActions.js";
import { getAllUsers } from "../../actions/userAction.js";
import {getAllCategory} from "../../actions/categoryAction.js";

const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { users } = useSelector((state) => state.allUsers);
    const { categories } = useSelector((state) => state.categories);
  
    useEffect(() => {
      dispatch(getAdminProduct());
      dispatch(getAllUsers());
      dispatch(getAllCategory());

    }, [dispatch]);
  
    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products !== undefined? products.length : 0}</p>
                        </Link>
                        
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users !== undefined ? users.length : 0}</p>
                        </Link>

                        <Link to="/admin/category/all">
                            <p>Categories</p>
                            <p>{categories !== undefined? categories.length : 0}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;