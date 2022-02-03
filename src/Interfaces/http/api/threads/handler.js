const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase')
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUseCase')

class ThreadsHandler {
    constructor (container) {
        this._container = container

        this.postThreadHandler = this.postThreadHandler.bind(this)
        this.getThreadHandler = this.getThreadHandler.bind(this)
    }

    async postThreadHandler (req, h) {
        const { id: credentialId } = req.auth.credentials
        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name)

        const addedThread = await addThreadUseCase.execute(req.payload, credentialId)

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
        const { threadId } = req.params
        console.log(threadId)
        const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name)

        const thread = await getThreadUseCase.execute(threadId)

        const response = h.response({
            status: 'success',
            data: {
                thread
            }
        })

        response.code(200)
        return response
    }
}

module.exports = ThreadsHandler
