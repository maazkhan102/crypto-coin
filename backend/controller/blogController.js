const Joi = require('joi');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const fs = require('fs'); // File system module to save image
const Blog = require('../models/blog');
const {BACKEND_SERVER_PATH} = require('../config/index');
const BlogDTO = require('../dto/blog');
const BlogDetailsDTO = require('../dto/blog-details');

console.log("BACKEND_SERVER_PATH", BACKEND_SERVER_PATH);

const blogController = {
    async create(req, res, next){
        // 1. Validate req body
        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        });

        const {error} = createBlogSchema.validate(req.body);
        if (error){
            return next(error);
        }


         // 2. Handle photo storage, naming
        // client side say hamarey pass photo aayege base64 encoded string may -> hum us photo ko backend may decode kareyge -> store -> save photo's path in db matlab filename save hoga
        const {title, author , content, photo} = req.body;
        // yaha per hamey photo handle karna hai wo aisey kareygey
        // read as buffer  (node ka apna buffer hota)
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),'base64');

        // allot a random name
        const imagePath = `${Date.now()}-${author}.png`;

        // save locally
        try{
            fs.writeFileSync(`storage/${imagePath}`, buffer);
        }
        catch(error){
            return next(error);
        }

        // 3. add blog to db
        let newBlog;
        try{
                newBlog = new Blog({
                title,
                author,
                content,
                photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`
            });

            await newBlog.save();
        }
        catch(error){
            return next(error);
        }

        // 4. return response
        const blogDto = new BlogDTO(newBlog);
        return res.status(201).json({blog: blogDto});

    },
    async getAll(req, res, next){
        try{
            const blogs = await Blog.find({});
            const blogsDto = [];
            for (let i=0; i<blogs.length; i++){
                const dto = new BlogDTO(blogs[i]);
                blogsDto.push(dto);
            }
            return res.status(200).json({blogs: blogsDto});

        }
        catch(error){
            return next(error);
        }
        
    },
    async getById(req, res, next){
        // 1. validate id
        
        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const {error} = getByIdSchema.validate(req.params);
        if (error){
            return next(error);
        }

        let blog;
        const {id} = req.params;
        try{
            blog = await Blog.findOne({_id: id}).populate('author');
        }
        catch(error){
            return next(error);
        }

        // 2. Send response
        const blogDto = new BlogDetailsDTO(blog);
        return res.status(200).json({blog: blogDto});
        
    },
    async update(req, res, next){
        // validate
        const updateBlogSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
            title: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        });

        const {error} = updateBlogSchema.validate(req.body);

        const {title, content, author, blogId , photo} = req.body;
        
        
    },
    async delete(req, res, next){
        
    }
}

module.exports = blogController;