import { v4 as uuidv4 } from 'uuid';
import { getCartById, createCart, updateCart } from "../services/cart.service.js"

export const cartById = async(req, res, next, id) => {
    try{
        const cart = await getCartById(id);
        if(!cart.message){
            req.cart = cart;
            next();
        }else{
            return res.status(400).json({
                message:cart.message
            })
        }
    }catch(err){
        return res.status(400).json({
            message:'Something Went Wrong'
        })
    }
}

export const read = async(req, res) => {
    try{
        const cart = req.cart;
        return res.status(200).json({
            data:cart
        })
    }catch(err){
        return res.status(400).json({
            message:'Something Went Wrong'
        })
    }
}

export const createNewCart = async(req, res) => {
    try{ 
        const cart_id = uuidv4();
        const {email_id='anonymous@anonymous.com', products, total} = req.body;
        createCart({cart_id,email_id,products,total}).then((data) => {
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

export const updateCartById = async(req, res) => {
    try{ 
        const cart = req.cart;
        const cart_id = req.cart.cart_id;
        const {email_id='anonymous@anonymous.com', products, total} = req.body;
        updateCart({cart_id,email_id,products,total,cart}).then((data) => {
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