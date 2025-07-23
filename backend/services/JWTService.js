const JWT = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/index');
const RefreshToken = require('../models/token');

class JWTService{
    // Sign Access token

    // it is payment means Data (payload) to include in the token (e.g., user ID and email)
    static signAccessToken(payment, expiryTime ){
        return JWT.sign(payment, ACCESS_TOKEN_SECRET , {expiresIn: expiryTime});
    }

    
    // Sign Refresh token
    static signRefreshToken(payment, expiryTime){
        return JWT.sign(payment, REFRESH_TOKEN_SECRET , {expiresIn: expiryTime});
    } 


    // verify access token
     static verifyAccessToken(token){
        return JWT.verify(token, ACCESS_TOKEN_SECRET);
    }


    // verify refresh token
    static verifyRefreshToken(token){
        return JWT.verify(token, REFRESH_TOKEN_SECRET);
    }


    // store refresh token
    static async storeRefreshToken(token, userId){
        try{
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            })
            // store in db
            await newToken.save();
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = JWTService;
