import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import { Slide } from 'react-slideshow-image';


const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    
    const [quantity, setQuantity] = useState(1);

    const toastOptions = {
        position: "bottom-center",
        autoClose: 3001,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const options = {
        value: (product!== undefined && product.ratings !== undefined)? product.ratings.$numberDecimal : 0,
        readOnly: true,
        precision: 0.5,
        color: "blue",
    };  

    

    const incQty = () => {
        if (product.Stock <= quantity) 
        return;
        const qty = quantity + 1;
        setQuantity(qty);
    };
    
    const decQty = () => {
        if (1 >= quantity) 
        return;
        const qty = quantity - 1;
        setQuantity(qty);
    };
    
    useEffect(() => {
        if (error) {
            toast.error(error, toastOptions);
            <ToastContainer />
            return;
        }

        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);
    
    return (
    <Fragment>
    {loading ? <Loader /> : (
    <Fragment>
        <MetaData title={`${product.name} - Inventory`} />
        <div className="ProductDetails">
            <div className = "slider">
                <Slide>
                {product.images &&
                    product.images.map((item, i) => (
                    <img
                    className="SlideImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                    />
                ))}
                </Slide>
            </div>
            <div>
                <div className="prodHeading">
                    <h2>{product.name}</h2>
                    <h4>Product #{product._id}</h4>
                </div>
                <div className="ratings">
                    <Rating {...options} />
                    <span className="reviewsCount">
                        {" "}
                        (0 Reviews)
                    </span>
                </div>
                <div className="incDec">
                    <h2>{`₹${product.price}`}</h2>
                    <div className="addToCart">
                        <div className="add">
                            <button onClick={decQty}>-</button>
                            <input readOnly type="number" value={quantity}/>
                            <button onClick={incQty}>+</button>
                        </div>
                        <button disabled={product.Stock < 1 ? true: false} >
                            Add to Cart
                        </button>
                    </div>

                    <p> Status - 
                        <b style={{color: product.Stock < 1 ? "red": "green"}}>
                            {product.Stock < 1 ? " OutOfStock" : " InStock"}
                        </b>
                    </p>
                </div>

                <div className="description">
                    Description: <p>{product.description}</p>
                </div>
                <button className="submitReview">
                    Submit Review
                </button>
            </div>
        </div>

    </Fragment>
    )}
    <ToastContainer />
    </Fragment>
    );
};

export default ProductDetails;