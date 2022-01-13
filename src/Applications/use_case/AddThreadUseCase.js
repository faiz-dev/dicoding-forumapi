const CreateThread = require('../../Domains/threads/entities/CreateThread')

class AddThreadUseCase {
    constructor ({ threadRepository }) {
        this._threadRepository = threadRepository
    }

    async execute (useCasePayload) {
        console.log('ex: ', useCasePayload)
        const createThread = new CreateThread(useCasePayload)
        console.log('ct', createThread)
        return this._threadRepository.addThread(createThread)
    }
}

module.exports = AddThreadUseCase
