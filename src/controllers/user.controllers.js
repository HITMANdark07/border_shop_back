import { GOOGLE_CLIENT_ID, NODE_JWT_SECRET } from '../constants.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../services/user.service.js';

const clinet = new OAuth2Client(GOOGLE_CLIENT_ID);


export const userById = async(req, res, next,id) => {
    try{
        const user = await getUserByEmail(id);
        if(!user.message){
            return res.status(200).json({
                user:user
            })
        }else{
            return res.status(400).json({
                message:user.message
            })
        }
    }catch(err){
        return res.status(400).json({
            message:err
        })
    }
}

export const read = async(req, res) => {
    try{
        let user = req.user;
        return res.status(200).json({
            data:user
        })
    }catch(err){
        return res.status(400).json({
            message:err
        })
    }
}

export const login = async(req, res) => {
    try{
        const { idToken, name, photo } = req.body;
        clinet.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID})
        .then(async(response) => {
            const { email_verified, email } = response.payload;
            if(email_verified){
                getUserByEmail(email).then((user) => {
                    if(user?.activated==1){
                        const { email } = user;
                        const token = jwt.sign({ email: email }, NODE_JWT_SECRET);
                        res.cookie("t", token, { expire: new Date() + 9999 });
                        return res.json({
                            token,
                            user: user,
                        });
                    }else{
                        return res.status(400).json({
                            message:'Your account is Locked'
                        })
                    }
                }).catch((err) => {
                    createUser({email, name, photo,activated:1}).then((createdUser) => {
                        const token = jwt.sign({ email: createdUser.email }, NODE_JWT_SECRET);
                        res.cookie("t", token, { expire: new Date() + 9999 });
                        return res.status(200).json({
                            token,
                            user: createdUser,
                        });
                    }).catch((err) => {
                        console.log(err);
                        return res.status(400).json({
                            message:err
                        });
                    })
                })
            }else{
                return res.status(400).json({
                    message: "Your Email is not verified",
                  });
            }
        }).catch((err) => {
          return res.status(400).json({
            message: "something went wrong",
          });
        });
    }catch(err){
        return res.status(400).json({
            message:'Something Went Wrong'
        })
    }
}


export const isUser = (req, res, next) => {
    let user = req.user && req.auth && req.user.email == req.auth.email;
    if (!user) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
};
  