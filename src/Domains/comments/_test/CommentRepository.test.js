const CommentRepository = require('../CommentRepository')

describe('CommentRepository Interface', () => {
    it('should throw error when invoke abstract behaviour', async () => {
        // Arrange
        const commentRepository = new CommentRepository()

        // Assert
        await expect(commentRepository.addComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })
})
