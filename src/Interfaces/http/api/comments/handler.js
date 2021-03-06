const CommentUseCase = require('../../../../Applications/use_case/CommentUseCase')

class CommentHandler {
    constructor (container) {
        this._container = container

        this.postCommentHandler = this.postCommentHandler.bind(this)
        this.deleteCommentHandler = this.deleteCommentHandler.bind(this)
    }

    async postCommentHandler (req, h) {
        const commentUseCase = this._container.getInstance(CommentUseCase.name)
        const { id: credentialId } = req.auth.credentials

        const addedComment = await commentUseCase.addComment({
            threadId: req.params.threadId,
            ...req.payload,
            createdBy: credentialId
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
        const { id: credentialId } = req.auth.credentials
        const commentUseCase = this._container.getInstance(CommentUseCase.name)

        await commentUseCase.deleteComment({
            threadId, commentId, createdBy: credentialId
        })

        const response = h.response({
            status: 'success'
        })

        response.code(200)
        return response
    }
}

module.exports = CommentHandler
