const CommentRepository = require('../../../Domains/comments/CommentRepository')
const CommentUseCase = require('../CommentUseCase')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')

describe('CommentUseCase', () => {
    it('should orchestrating the add comment correctly', async () => {
        // Arrange
        const useCasePayload = {
            content: 'test comment',
            threadId: 'thread-123',
            createdBy: 'user-123'
        }

        const expectedAddedComment = {
            id: 'comment-123',
            createdAt: '123',
            ...useCasePayload
        }

        // Creating Dependency of use case
        const mockCommentRepository = new CommentRepository()
        const mockThreadRepository = new ThreadRepository()

        // Mocking needed functions
        mockCommentRepository.addComment = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedAddedComment))
        mockThreadRepository.verifyThreadAvailability = jest.fn()
            .mockImplementation(() => true)
        // Creating Use Case Instance
        const commentUseCase = new CommentUseCase({ commentRepository: mockCommentRepository, threadRepository: mockThreadRepository })

        // Action
        const createdComment = await commentUseCase.addComment(useCasePayload)

        // Assert
        expect(createdComment).toStrictEqual(expectedAddedComment)
        expect(mockCommentRepository.addComment).toBeCalledWith({
            content: useCasePayload.content,
            threadId: useCasePayload.threadId,
            createdBy: useCasePayload.createdBy
        })
    })

    it('should orchestrating the delete comment correctly', async () => {
        // Arrange
        const useCasePayload = {
            commentId: 'comment-123',
            threadId: 'thread-123',
            createdBy: 'user-123'
        }

        // Creating Dependency of use case
        const mockCommentRepository = new CommentRepository()
        const mockThreadRepository = new ThreadRepository()

        // Mocking needed functions
        mockCommentRepository.deleteComment = jest.fn()
            .mockImplementation(() => {})
        mockCommentRepository.verifyCommentOwner = jest.fn()
            .mockImplementation(() => {})

        // Creating Use Case Instance
        const commentUseCase = new CommentUseCase({ commentRepository: mockCommentRepository, threadRepository: mockThreadRepository })

        // Action
        await commentUseCase.deleteComment(useCasePayload)

        // Assert
        expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.commentId)
        expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(useCasePayload.commentId, useCasePayload.createdBy)
    })
})
