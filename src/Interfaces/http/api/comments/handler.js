const CommentUseCase = require('../../../../Applications/use_case/CommentUseCase')

class CommentHandler {
    constructor (container) {
        this._container = container

        this.postCommentHandler = this.postCommentHandler.bind(this)
        this.deleteCommentHandler = this.deleteCommentHandler.bind(this)
    }

    async postCommentHandler (req, h) {
        const commentUseCase = this._container.getInstance(CommentUseCase.name)

        const addedComment = commentUseCase.addComment({
            threadId: req.params.threadId,
            ...req.payload
        })

        const response = h.response({
            status: 'success',
            data: {
                addedComment
            }
        })

        response.code(201)
        return response
    }

    async deleteCommentHandler (req, h) {
        const { threadId, commentId } = req.params
        const { createdBy } = req.payload
        const commentUseCase = this._container.getInstance(CommentUseCase.name)

        commentUseCase.deleteComment({
            threadId, commentId, createdBy
        })

        const response = h.response({
            status: 'success'
        })

        response.code(201)
        return response
    }
}

module.exports = CommentHandler
