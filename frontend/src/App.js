import "./App.css"
import Header from "./component/layout/Header/Header"
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import React, { useEffect } from 'react'
import webFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer"
import Home from './component/Home/Home.js'
import ProductDetails from './component/Products/ProductDetails'
import Products from './component/Products/Products'
import Search from './component/Products/Search'
import LoginSignup from './component/User/LoginSignup'
import store from './store.js'
import { loadUser } from "./actions/userAction"
import UserOptions from './component/layout/Header/UserOptions'
import { useSelector } from "react-redux"
import Profile from './component/User/Profile'
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from './component/User/ForgotPassword'
import ResetPassword from './component/User/ResetPassword'
import { useState } from "react"
import Dashboard from './component/Admin/Dashboard'
import ProductList from './component/Admin/ProductList'
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
import UserList from './component/Admin/UserList'
import UpdateUser from "./component/Admin/UpdateUser"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from './component/layout/Contact/Contact'
import CategoryList from './component/Admin/CategoryList';
import NewCategory from './component/Admin/NewCategory';
import UpdateCategory from './component/Admin/UpdateCategory';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const toastOptions = {
    position: "bottom-center",
    autoClose: 3001,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }; 


  useEffect(() =>{
  
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
    store.dispatch(loadUser());
  }, [])

  function RequireAuth({isAdmin, children, redirectTo }) {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if(loading === false)
    {
      if(isAuthenticated===false)
        return <Navigate to={redirectTo} />
      if(user !== undefined && isAdmin === true && user.role !== "admin")
      {
        toast.error("You can't access this resource", toastOptions);
        <ToastContainer />
        return <Navigate to="/" />
      }
      return children;
    }
  }

  return <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
        <Route path="/" element={<Home />} /> 

        <Route path="/product/:id" element={<ProductDetails />} /> 

        <Route path="/products" element={<Products />} /> 

        <Route path="/products/:keyword" element={<Products />} /> 

        <Route path="/search" element={<Search />} /> 

        <Route path="/login" element={<LoginSignup />} /> 

        <Route path="/account" element={<RequireAuth redirectTo="/login" children={<Profile />}></RequireAuth>}/>

        <Route path="/me/update" element={<RequireAuth redirectTo = "/login" children={<UpdateProfile />} ></RequireAuth > } />

        <Route path="/password/update" element={<RequireAuth redirectTo = "/login" children={<UpdatePassword />} ></RequireAuth > } />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/admin/dashboard" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<Dashboard />} ></RequireAuth > } />

        <Route path="/admin/products" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<ProductList />} ></RequireAuth > } />
        
        <Route path="/admin/product" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<NewProduct />} ></RequireAuth > } />

        <Route path="/admin/product/:id" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<UpdateProduct />} ></RequireAuth > } />

        <Route path="/admin/users" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<UserList />} ></RequireAuth > } />

        <Route path="/admin/user/:id" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<UpdateUser />} ></RequireAuth > } />

        <Route path="/contact" element={<Contact />} /> 
        
        <Route path="/admin/category/all" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<CategoryList />} ></RequireAuth > } />
        
        <Route path="/admin/category/create" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<NewCategory />} ></RequireAuth > } />
        
        <Route path="/admin/category/:id" element={<RequireAuth isAdmin={true} redirectTo = "/login" children={<UpdateCategory />} ></RequireAuth > } />
        

    </Routes>
    
    
    <ToastContainer />
    <Footer />
  </Router>
}

export default App