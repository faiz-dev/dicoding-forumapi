const ThreadRepository = require('../ThreadRepository')

describe('ThreadRepository Interface', () => {
    it('should throw error when invoke abstract behaviour', async () => {
        // Arrange
        const threadRepository = new ThreadRepository()

        // Assert
        await expect(threadRepository.addThread({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(threadRepository.getThreadById({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(threadRepository.verifyThreadAvailability({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })
})
