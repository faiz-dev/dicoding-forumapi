class CommentRepository {
    async addComment (createComment) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async getCommentsByThreadId (id) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async deleteComment (id) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async verifyCommentOwner (id, ownerId) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }
}

module.exports = CommentRepository
