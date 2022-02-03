const CreateThread = require('../../Domains/threads/entities/CreateThread')

class AddThreadUseCase {
    constructor ({ threadRepository }) {
        this._threadRepository = threadRepository
    }

    async execute (useCasePayload, ownerId) {
        const createThread = new CreateThread({ ...useCasePayload, owner: ownerId })
        return this._threadRepository.addThread(createThread)
    }
}

module.exports = AddThreadUseCase
