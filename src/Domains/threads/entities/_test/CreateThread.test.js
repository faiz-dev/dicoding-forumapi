const CreateThread = require('../CreateThread')

describe('an CreateThread Entity', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            title: ''
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
            title: 'RPL SMK Kandeman'
        }

        // Action
        const createThread = new CreateThread(payload)

        // Assert
        expect(createThread.title).toEqual(payload.title)
    })
})
