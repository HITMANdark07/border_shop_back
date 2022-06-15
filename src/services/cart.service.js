import db from '../db.js';

export const getCartById = async(id) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName:'carts',
            Key:{
                cart_id:id
            }
        };
        db.get(params,(err, data) => {
            if(err){
                reject(err);
            }else{
                if(data.Item){
                    resolve(data.Item);
                }else{
                    reject('Cart not Found');
                }
            }
        })
    })
}

export const createCart = async({cart_id, email_id, products, total}) => {
    return new Promise((resolve, reject) => {
            const input = {
                "cart_id":cart_id,
                "email_id":email_id,
                "products":products,
                "total_price":total,
                "createdAt":Date.now(),
                "updatedAt":Date.now(),
                "isDeleted":false
            }
            const params = {
                TableName:'carts',
                Item: input
            };
            db.put(params,(err, data) => {
                if(err){
                    reject(err.code);
                }else{
                    resolve(input);
                }
            })

    })
}

export const updateCart = async({cart_id, email_id, products, total,cart}) => {
    console.log(cart_id, email_id);
    return new Promise((resolve, reject) => {
        const params = {
            TableName:'carts',
            Key:{
                cart_id:cart_id
            },
            UpdateExpression: "set email_id = :email, products = :prodcts, total_price = :ttl, udatedAt = :updateTime",
            ExpressionAttributeValues: {
                ":email": email_id || cart?.email_id ,
                ":prodcts": products || cart?.products,
                ":ttl": total,
                ":updateTime":Date.now()
            }
        };
        db.update(params,(err, data) => {
            if(err){
                reject(err);
            }else{
                getCartById(cart_id).then((cart) => {
                    resolve(cart);
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    })
}