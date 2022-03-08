const CommentRepository = require('../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const GetThreadUseCase = require('../GetThreadUseCase')

describe('GetThreadUseCase', () => {
    it('should return thread details correctly', async () => {
        const mdate = new Date().getTime()
        const ndate = new Date().getTime()
        const expectedThread = {
            id: 'thread-124',
            title: 'dicoding',
            body: 'dicoding Indonesia',
            date: new Date(ndate * 1000).toISOString(),
            username: 'Dicoding Indonesia',
            comments: [
                {
                    id: 'comment-123',
                    username: 'Dicoding Indonesia',
                    date: new Date(mdate * 1000).toISOString(),
                    content: 'Hello Comment'
                },
                {
                    id: 'comment-124',
                    username: 'Dicoding Indonesia',
                    date: new Date(mdate * 1000).toISOString(),
                    content: '**komentar telah dihapus**'
                }
            ]
        }

        const threadId = 'thread-124'
        const mockThreadRepository = new ThreadRepository()
        const mockCommentRepository = new CommentRepository()

        mockThreadRepository.verifyThreadAvailability = jest.fn()
            .mockImplementation(() => Promise.resolve())
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve({
                id: 'thread-124',
                title: 'dicoding',
                body: 'dicoding Indonesia',
                created_at: mdate,
                username: 'Dicoding Indonesia'
            }))
        mockCommentRepository.getCommentsByThreadId = jest.fn()
            .mockImplementation(() => Promise.resolve([
                {
                    id: 'comment-123',
                    username: 'Dicoding Indonesia',
                    created_at: ndate,
                    content: 'Hello Comment',
                    deleted: null
                },
                {
                    id: 'comment-124',
                    username: 'Dicoding Indonesia',
                    created_at: ndate,
                    content: 'Hello Comment',
                    deleted: true
                }
            ]))

        const getThreadUseCase = new GetThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository
        })

        // Action
        const thread = await getThreadUseCase.execute(threadId)

        // Assert
        expect(thread).toStrictEqual(expectedThread)
        expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId)
        expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(threadId)
    })

    it('should return thread with comments included when available', async () => {

    })

    it('should throw error when thread not found', async () => {

    })
})
