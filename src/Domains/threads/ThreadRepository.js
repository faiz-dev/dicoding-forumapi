class ThreadRepository {
    async addThread (createThread) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async getThreadById (id) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async verifyThreadAvailability (id) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }
}

module.exports = ThreadRepository
