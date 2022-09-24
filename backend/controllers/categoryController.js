const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAysncErrors");

//create product -- accessed by admin only 
exports.createCategory = catchAsyncError(async(req, res, next)=>{

    // console.log(req.body);
    const newCategory = await Category.create(req.body);
    res.status(200).json({
        success: true,
        category: newCategory
    })
})

// get All products
exports.getAllCategory = catchAsyncError(async(req, res, next)=>{

    const allCategory = await Category.find();
    res.status(200).json({
        success: true,
        allCategory
    });
})

//update category -- accessed by admin
exports.updateCategory = catchAsyncError(async(req, res) => {

    let category = await Category.findById(req.params.id);
    if(!category)
        return next(new ErrorHandler("Category not found", 404));
        
    await Product.updateMany(
        {category: category.name},
        {$set: { category: req.body.name }}
    )

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    res.status(200).json({
        success: true,
        category
    })
})

//delete category -- accessed by admin
exports.deleteCategory = catchAsyncError(async(req, res) => {

    let category = await Category.findById(req.params.id);
    if(!category)
        return next(new ErrorHandler("Category not found", 404));
        
    let products = await Product.find({category: category.name});
    // console.log(products);
    for (let i = 0; i < products.length; i++) 
        await products[i].remove();
    
    await category.remove();
    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    })
})

//get category details
exports.getCategoryDetails = catchAsyncError(async(req, res) => {

    let category = await Category.findById(req.params.id);
    if(!category)
        return next(new ErrorHandler("Category not found", 404));
    
    res.status(200).json({
        success: true,
        category
    })
})