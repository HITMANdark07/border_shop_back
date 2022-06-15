import { getProducts, getProductsByCategory, getProductBySlug } from "../services/product.service.js"

export const getProductById = (req, res, next, _slug) => {
    try{
        getProductBySlug(_slug).then((data) => {
            req.product = data;
            next();
        }).catch((err) => {
            return res.status(400).json({
                message:err
            })
        })
    }catch(err){
        return res.status(400).json({
            message:'Something went wrong!'
        })
    }
}

export const readProductData = async(req, res) => {
    try{
        let data = req.product;
        return res.status(200).json({data})
    }catch(err){
        return res.status(400).json({
            message:'Something went wrong...'
        })
    }
}

export const listAllProducts = (req, res) => {
    try{
        getProducts().then((products) => {
            return res.status(200).json({
                data:products
            })
        }).catch((err) => {
            return res.status(400).json({
                message:err
            })
        })
    }catch(err){
        return res.status(400).json({
            message:'Something Went Wrong'
        })
    }
}

export const listProductByCategory = async(req, res) => {
    try{
        const {category} = req.params;
        getProductsByCategory(category).then((data) => {
            return res.status(200).json({
                data:data
            })
        }).catch((err) => {
            return res.status(400).json({
                message:err
            })
        })
    }catch(err){
        return res.status(400).json({
            message:'Something Went Wrong'
        })
    }
}