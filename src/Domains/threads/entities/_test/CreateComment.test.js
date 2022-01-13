const CreateComment = require('../CreateComment')

describe('an CreateComment Entity', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            content: 'no comment',
            threadId: 'thread-123'
        }

        expect(() => new CreateComment(payload)).toThrowError('CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    })

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            content: true,
            threadId: 'thread-123',
            createdBy: 'user-123'
        }

        // Action & Assert
        expect(() => new CreateComment(payload)).toThrowError('CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    })

    it('should create comment correctly', () => {
        // Arrange
        const payload = {
            content: 'Pertamax',
            threadId: 'thread-123',
            createdBy: 'user-123'
        }

        // Action
        const createComment = new CreateComment(payload)

        // Assert
        expect(createComment.content).toEqual(payload.content)
        expect(createComment.threadId).toEqual(payload.threadId)
        expect(createComment.createdBy).toEqual(payload.createdBy)
    })
})
