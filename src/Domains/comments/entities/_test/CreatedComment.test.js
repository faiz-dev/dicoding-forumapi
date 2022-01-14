const CreatedComment = require('../CreatedComment')

describe('A CreatedComment Entity', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'comment-123',
            content: 'no comment',
            threadId: 'thread-123',
            createdBy: 'user-123'
        }

        // Action & Assert
        expect(() => new CreatedComment(payload)).toThrowError('CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    })

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: true,
            content: 'no comment',
            createdAt: new Date().getUTCMilliseconds(),
            threadId: 'thread-123',
            createdBy: 'user-123'
        }

        // Action & Assert
        expect(() => new CreatedComment(payload)).toThrowError('CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    })
})
