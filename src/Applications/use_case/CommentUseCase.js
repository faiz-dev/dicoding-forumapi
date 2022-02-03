class CommentUseCase {
    constructor ({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
    }

    async addComment (useCasePayload) {
        const { content, threadId, createdBy } = useCasePayload
        await this._threadRepository.verifyThreadAvailability(threadId)

        if (!content) {
            throw new Error('COMMENT_USE_CASE.CONTENT_EMPTY')
        }

        if (typeof content !== 'string') {
            throw new Error('COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }

        const createComment = {
            content,
            threadId,
            createdBy
        }
        return await this._commentRepository.addComment(createComment)
    }

    async deleteComment (useCasePayload) {
        const { commentId, createdBy } = useCasePayload

        await this._commentRepository.verifyCommentOwner(commentId, createdBy)

        await this._commentRepository.deleteComment(commentId)
    }
}

module.exports = CommentUseCase
