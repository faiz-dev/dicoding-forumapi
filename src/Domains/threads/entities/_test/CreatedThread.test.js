const CreatedThread = require('../CreatedThread')

describe('an CreatedThread Entity', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'thread-123'
        }

        // Action & Assert
        expect(() => new CreatedThread(payload)).toThrowError(
            'CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
        )
    })

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            content: true,
            owner: 'user-DWrT3pXe1hccYkV1eIAxS'
        }

        // Action & Assert
        expect(() => new CreatedThread(payload)).toThrowError(
            'CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
        )
    })

    it('should create createdThread correctly', async () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            content: 'RPL Kandeman',
            owner: 'user-DWrT3pXe1hccYkV1eIAxS'
        }

        // Action
        const createdThread = new CreatedThread(payload)

        // Assert
        expect(createdThread.id).toEqual(payload.id)
        expect(createdThread.content).toEqual(payload.content)
        expect(createdThread.owner).toEqual(payload.owner)
    })
})
