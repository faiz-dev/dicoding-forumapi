class CommentUseCase {
    constructor ({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
    }

    async addComment (useCasePayload) {
        const { content, threadId, createdBy } = useCasePayload
        await this._threadRepository.verifyThreadAvailability(threadId)
        const createComment = {
            content,
            threadId,
            createdBy
        }
        return this._commentRepository.addComment(createComment)
    }

    async deleteComment (useCasePayload) {
        const { commentId, createdBy } = useCasePayload

        this._commentRepository.verifyCommentOwner(commentId, createdBy)

        this._commentRepository.deleteComment(commentId)
    }
}

module.exports = CommentUseCase
