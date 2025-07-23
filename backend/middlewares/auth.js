const JWTService = require("../services/JWTService");
const User = require("../models/user");
const UserDTO = require("../dto/user");

const auth = async (req, res, next) => {
    try{
        // 1. refresh, access token validation
    const {refreshToken , accessToken} = req.cookies; 
    // These tokens are expected to be present in the client's cookies. If either is missing, the user is considered unauthorized

    if (!refreshToken || !accessToken) {
        const error = {
            status: 401,
            message: 'Unauthorized!'
        }
        return next(error);
    }

    let _id;    
    try{
        _id = JWTService.verifyAccessToken(accessToken)._id; 
        // The token payload contains a user _id (set when token was created).
    }
    catch(error){
        return next(error);
    }

    let user;
    try{
        user = await User.findOne({_id: _id});
        // Fetch the user from MongoDB using the above extracted _id.
    }
    catch(error){
        return next(error);
    }

    const userDto = new UserDTO(user);

    req.user = userDto;

    next();
    }
    catch(error){
        return next(error);
    }
}
module.exports = auth;