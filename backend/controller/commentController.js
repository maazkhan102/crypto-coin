const Joi = require("joi");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const CommentDTO = require("../dto/comment");
const commentController = {
    async create(req, res, next) {
        // 1. Validate request body
        const createCommentSchema = Joi.object({
            content: Joi.string().required(),
            blog: Joi.string().regex(mongodbIdPattern).required(),
            author: Joi.string().regex(mongodbIdPattern).required()
        });

        const { error } = createCommentSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { content, blog, author } = req.body;

        // 2. Make sure blog exists
        let existingBlog;
        try {
            existingBlog = await Blog.findById(blog);
            if (!existingBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }
        } catch (err) {
            return next(err);
        }

        // 3. Save comment
        let newComment;
        try {
            newComment = new Comment({
                content,
                blog,
                author
            });
            await newComment.save();
        } catch (err) {
            return next(err);
        }

        // 4. Respond
        return res.status(201).json({
            message: "Comment created successfully",
            comment: newComment
        });
    },
    async getById(req, res, next) {
        // 1. Validate :id from URL
        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const { error } = getByIdSchema.validate(req.params);
        if (error) {
            return next(error);
        }

        const { id } = req.params;

        // 2. Fetch comments for this blog
        let comments;
        try {
            comments = await Comment.find({ blog: id })
                .populate("author", "username email") // only fetch username, email from User
                .sort({ createdAt: -1 }); // latest first
        } catch (err) {
            return next(err);
        }

        // 3. If no comments found
        if (!comments || comments.length === 0) {
            return res.status(200).json({ message: "No comments for this blog yet", comments: [] });
        }

        let commentsDto = [];
        for (let i = 0; i < comments.length; i++) {
            commentsDto.push(new CommentDTO(comments[i]));
        }

        // 4. Send response
        return res.status(200).json({ data: commentsDto });
    }
}
module.exports = commentController;