class CommentDTO {
    constructor(comment) {
        this._id = comment._id;
        this.content = comment.content;
        this.author = comment.author;
        this.createdAt = comment.createdAt;
    }
}

module.exports = CommentDTO;