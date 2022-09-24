const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAysncErrors");
const ApiFeatures = require("../utils/ApiFeature");
const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary");

//create product -- accessed by admin only 
exports.createProduct = catchAsyncError(async(req, res, next)=>{

    let images = [];
    if (typeof req.body.images === "string") 
        images.push(req.body.images);
    else 
        images = req.body.images;
    
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
    
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    const foundCategory = await Category.find({name: req.body.category});
    if(!foundCategory.length)
        await Category.create({name: req.body.category});

    res.status(200).json({
        success: true,
        product: product
    })
})

// get All products
exports.getAllProducts = catchAsyncError(async(req, res, next)=>{

    const resultPerPage = 5;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    let filteredProducts = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        filteredProducts,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
})

// Get All Product (Accessed by Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
        success: true,
        products,
    });
});

//update product -- accessed by admin
exports.updateProduct = catchAsyncError(async(req, res) => {

    let product = await Product.findById(req.params.id);
    if(!product)
        return next(new ErrorHandler("Product not found", 404));
    
    let images = [];

    if (typeof req.body.images === "string")
        images.push(req.body.images);
    else 
        images = req.body.images;
    

    if (images !== undefined) {
        
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLinks;
    }
    const count = await Product.find({category: product.category});
    if(count.length === 1)
    {
        let cat = await Category.findOne({name: product.category});
        cat = await Category.findById(cat._id);
        await cat.remove();
    }

    const foundCategory = Category.find({name: req.body.category});
    if(!foundCategory)
        await Category.create(req.body.category);
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    res.status(200).json({
        success: true,
        product
    })
})

//delete product -- accessed by admin
exports.deleteProduct = catchAsyncError(async(req, res) => {

    let product = await Product.findById(req.params.id);
    if(!product)
        return next(new ErrorHandler("Product not found", 404));

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const count = await Product.find({category: product.category});
    if(count.length === 1)
    {
        let cat = await Category.findOne({name: product.category});
        cat = await Category.findById(cat._id);
        await cat.remove();
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

//get product details
exports.getProductDetails = catchAsyncError(async(req, res) => {

    let product = await Product.findById(req.params.id);
    if(!product)
        return next(new ErrorHandler("Product not found", 404));
    
    res.status(200).json({
        success: true,
        product
    })
})