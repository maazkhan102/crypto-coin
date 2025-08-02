  class BlogDetailsDTO{
    constructor(blog, user, comments){
        this.id = blog._id;
        this.content = blog.content
        this.title = blog.title;
        this.photo = blog.photoPath;
        this.authorName = blog.author.name;
        this.authorUsername = blog.author.username;
        this.createdAt = blog.createdAt;
    }
}

module.exports = BlogDetailsDTO;
