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
            createdAt: '01-01-2020 12:00:00',
            threadId: 'thread-123',
            createdBy: 'user-123'
        }

        // Action & Assert
        expect(() => new CreatedComment(payload)).toThrowError('CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    })

    it('should create object correctly', () => {
        // Arrange
        const payload = {
            id: 'comment-123',
            content: 'no comment',
            createdAt: '01-01-2020 12:00:00',
            threadId: 'thread-123',
            createdBy: 'user-123'
        }
        // Action
        const createdComment = new CreatedComment(payload)

        expect(createdComment.id).toEqual('comment-123')
        expect(createdComment.content).toEqual('no comment')
        expect(createdComment.createdAt).toEqual('01-01-2020 12:00:00')
        expect(createdComment.threadId).toEqual('thread-123')
        expect(createdComment.owner).toEqual('user-123')
    })
})
