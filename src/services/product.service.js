import db from '../db.js';

export const getProductBySlug = async(slug) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName:'products',
            Key:{
                product_slug:slug
            }
        };
        db.get(params,(err, data) => {
            if(err){
                reject(err);
            }else{
                if(data.Item){
                    resolve(data.Item);
                }else{
                    reject('Product not Found');
                }
            }
        })
    })
}
export const getProducts = async() => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName:'products',
        };
        db.scan(params,(err, data) => {
            if(err){
                reject(err);
            }else{
                if(data.Items){
                    resolve(data.Items);
                }else{
                    reject('User not Found');
                }
            }
        })
    })
}

export const getProductsByCategory = async(category) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName:'products',
            FilterExpression: "category = :cat",
            ExpressionAttributeValues:{
                ":cat":category
            }
        };
        db.scan(params,(err, data) => {
            if(err){
                reject(err);
            }else{
                if(data.Items){
                    resolve(data.Items);
                }else{
                    reject('Products not Found');
                }
            }
        })
    })
}