const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase')

class ThreadsHandler {
    constructor (container) {
        this._container = container

        this.postThreadHandler = this.postThreadHandler.bind(this)
        this.getThreadHandler = this.getThreadHandler.bind(this)
    }

    async postThreadHandler (req, h) {
        console.log('CRED', req)
        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name)

        const addedThread = await addThreadUseCase.execute(req.payload)

        const response = h.response({
            status: 'success',
            data: {
                addedThread
            }
        })

        response.code(201)
        return response
    }

    async getThreadHandler (req, h) {
        const response = h.response({
            status: 'success',
            data: {
                thread: {
                    comments: [
                        {
                            id: 'comment-123'
                        }
                    ]
                }
            }
        })

        response.code(200)
        return response
    }
}

module.exports = ThreadsHandler
