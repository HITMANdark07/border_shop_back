import db from '../db.js';

export const getUserByEmail = async(email) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName:'users',
            Key:{
                email_id:email
            }
        };
        db.get(params,(err, data) => {
            if(err){
                reject(err);
            }else{
                if(data.Item){
                    resolve(data.Item);
                }else{
                    reject('User not Found');
                }
            }
        })
    })
}

export const createUser = async({email, name, photo, activated=1}) => {
    return new Promise((resolve, reject) => {
            const input = {
                "email_id":email,
                "name":name,
                "photo":photo,
                "activated":activated,
                "createdAt":Date.now(),
                "updatedAt":Date.now(),
                "isDeleted":false
            }
            const params = {
                TableName:'users',
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