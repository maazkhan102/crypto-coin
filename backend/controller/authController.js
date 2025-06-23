const Joi = require('joi');
const  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/user');

const authController = {
    async register(req, res, next) {
        console.log("ddddddddddd", req.body);
        // 1. Validate user input
        const userRegisterSchema = Joi.object({
            name: Joi.string().required(),
            username: Joi.string().min(5).max(30).required(),
            email: Joi.string().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        });
        const {error} = userRegisterSchema.validate(req.body); 

        // 2. if error in validation -> return error via middleware
        if (error){
            return next(error);
        }

        // 3. if email or username is already registered -> return an error
        const {username , name, email, password} = req.body;
        try{
            const emailInUse = await User.exists({email});

            const usernameInUse = await User.exists({username});

            if  (emailInUse){
                const error = {
                    status: 409,
                    message: 'Email already registered, use another email!'
                }
                return next(error);
            }
            if  (usernameInUse){
                const error = {
                    status: 409,
                    message: 'Username not available, try another one!'
                }
                return next(error);
            }
        }
        catch(error){
            return next(error);
        }

        // 4. password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Store user data in db
        const userToRegister = new User({
            username,
            email,
            name,
            password: hashedPassword
        })
        const user = await userToRegister.save();

        const userDto = new UserDTO(user);
        // 6. Response send
        return res.status(201).json({user: userDto});

    },
    async login(req, res, next) {
        // 1. validate user input
        const userLoginSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            password: Joi.string().pattern(passwordPattern).required(),
        });
        const {error} = userLoginSchema.validate(req.body); 

        // 2. if error in validation -> return error via middleware
        if (error){
            return next(error);
        }


        // 3. match username and pass
        // we have to communicate with db in order to match the username and pass to find if the user is there or not
        const { username, password } = req.body;
        let user;
        try{
            // match user
            user = await User.findOne({username: username});
            if (!user){
                const error = {
                    status : 401,
                    message : 'Invalid username'
                }
                return next(error);
            }

            //match password
            // req.body.password -> hash -> match

            const match = await bcrypt.compare(password, user.password);
            if (!match){
                const error = {
                    status : 401,
                    message : 'Invalid password'
                }
                return next(error);
            }

        } 
        catch(error){
            return next(error);
        }

        const userDto = new UserDTO(user);
        // 4. return response
        return res.status(200).json({user : userDto});
    }
}
module.exports = authController;