const CreateThread = require('../CreateThread')

describe('an CreateThread Entity', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            title: '',
            owner: 'user-123'
        }

        // Action & Assert
        expect(() => new CreateThread(payload)).toThrowError(
            'CREATE_THREADS.NOT_CONTAIN_NEEDED_PROPERTY'
        )
    })

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            title: true,
            body: 'body thread',
            owner: 'user-DWrT3pXe1hccYkV1eIAxS'
        }

        // Action & Assert
        expect(() => new CreateThread(payload)).toThrowError(
            'CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
        )
    })

    it('should create thread correctly', async () => {
        // Arrange
        const payload = {
            title: 'Thread RPL SMK Kandeman',
            body: 'Body of thread',
            owner: 'user-123'
        }

        // Action
        const createThread = new CreateThread(payload)

        // Assert
        expect(createThread.content).toEqual(payload.content)
    })
})
