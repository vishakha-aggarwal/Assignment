import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productDetailsReducer, productReducer,  productsReducer } from "./reducers/productReducer";
import { userReducer, profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import {categoriesReducer, newCategoryReducer, categoryReducer, categoryDetailsReducer} from "./reducers/categoryReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    categories: categoriesReducer,
    newCategory: newCategoryReducer,
    category: categoryReducer,
    categoryDetails: categoryDetailsReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;