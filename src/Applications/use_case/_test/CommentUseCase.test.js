const CommentRepository = require('../../../Domains/comments/CommentRepository')
const CommentUseCase = require('../CommentUseCase')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')

describe('CommentUseCase', () => {
    describe('Add Comment', () => {
        it('should throw error when comment content is empty', async () => {
            // Arrange
            const useCasePayload = {
                content: '',
                threadId: 'thread-123',
                createdBy: 'user-123'
            }

            // Creating Dependency of use case
            const commentRepository = new CommentRepository()
            const mockThreadRepository = new ThreadRepository()

            // Mocking needed functions
            mockThreadRepository.verifyThreadAvailability = jest.fn()
                .mockImplementation(() => Promise.resolve(true))
            // Creating Use Case Instance
            const commentUseCase = new CommentUseCase({ commentRepository, threadRepository: mockThreadRepository })

            // Action & Assert
            expect(async () => await commentUseCase.addComment(useCasePayload)).rejects.toThrowError('COMMENT_USE_CASE.CONTENT_EMPTY')
            expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId)
        })

        it('should throw error when comment content not a string', async () => {
            // Arrange
            const useCasePayload = {
                content: true,
                threadId: 'thread-123',
                createdBy: 'user-123'
            }

            // Creating Dependency of use case
            const mockCommentRepository = new CommentRepository()
            const mockThreadRepository = new ThreadRepository()

            // Mocking needed functions
            mockThreadRepository.verifyThreadAvailability = jest.fn()
                .mockImplementation(() => Promise.resolve(true))
            // Creating Use Case Instance
            const commentUseCase = new CommentUseCase({ commentRepository: mockCommentRepository, threadRepository: mockThreadRepository })

            // Action & Assert
            expect(async () => await commentUseCase.addComment(useCasePayload)).rejects.toThrowError('COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION')
        })

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
                .mockImplementation(() => Promise.resolve(true))
            // Creating Use Case Instance
            const commentUseCase = new CommentUseCase({ commentRepository: mockCommentRepository, threadRepository: mockThreadRepository })

            // Action
            const createdComment = await commentUseCase.addComment(useCasePayload)

            // Assert
            expect(createdComment).toStrictEqual(expectedAddedComment)
            expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId)
            expect(mockCommentRepository.addComment).toBeCalledWith({
                content: useCasePayload.content,
                threadId: useCasePayload.threadId,
                createdBy: useCasePayload.createdBy
            })
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
            .mockImplementation(() => Promise.resolve())
        mockCommentRepository.verifyCommentOwner = jest.fn()
            .mockImplementation(() => Promise.resolve())

        // Creating Use Case Instance
        const commentUseCase = new CommentUseCase({ commentRepository: mockCommentRepository, threadRepository: mockThreadRepository })

        // Action
        await commentUseCase.deleteComment(useCasePayload)

        // Assert
        expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.commentId)
        expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(useCasePayload.commentId, useCasePayload.createdBy)
    })
})
