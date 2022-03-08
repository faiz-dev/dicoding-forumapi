const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment')
const pool = require('../../database/postgres/pool')
const CommentRepositoryPostgres = require('../CommentRespositoryPostgress')

describe('CommentRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable()
        await ThreadsTableTestHelper.cleanTable()
    })

    afterAll(async () => {
        await pool.end()
    })

    describe('Add Comment Function', () => {
        it('should presist add comment', async () => {
            // arrange
            const addUser = await UsersTableTestHelper.addUser({})
            const addThread = await ThreadsTableTestHelper.addThread({ owner: addUser.id })
            const createComment = {
                content: 'comment 1',
                threadId: addThread.id,
                createdBy: addUser.id
            }

            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => 123
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action
            await commentRepositoryPostgres.addComment(createComment)

            // Assert
            const comment = await CommentsTableTestHelper.findCommentById('comment-123')
            expect(comment).toHaveLength(1)
        })

        it('should return created thread correctly', async () => {
            // Arrange
            const addUser = await UsersTableTestHelper.addUser({})
            const addThread = await ThreadsTableTestHelper.addThread({ owner: addUser.id })
            const createComment = {
                content: 'comment 1',
                threadId: addThread.id,
                createdBy: addUser.id
            }

            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => 123
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action
            const createdComment = await commentRepositoryPostgres.addComment(createComment)

            // Assert
            expect(createdComment).toStrictEqual(new CreatedComment({
                id: 'comment-123',
                content: createComment.content,
                threadId: createComment.threadId,
                createdBy: createComment.createdBy,
                createdAt: fakeTimeSetter() + ''
            }))
        })
    })

    describe('getCommentsByThreadId ', () => {
        it('should return empty array when comment not found', async () => {
            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => ''
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action
            const comments = await commentRepositoryPostgres.getCommentsByThreadId('th-111')

            // Action & Assert
            expect(comments).toHaveLength(0)
        })

        it('should return correct comment when id given', async () => {
            await UsersTableTestHelper.addUser({})
            await ThreadsTableTestHelper.addThread({})
            await CommentsTableTestHelper.addComment({})

            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => ''
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action
            const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123')

            // Assert
            expect(comments).toHaveLength(1)
            expect(comments[0].id).toEqual('comment-123')
            expect(comments[0].content).toEqual('dicoding')
            expect(comments[0].thread_id).toEqual('thread-123')
            expect(comments[0].created_by).toEqual('user-123')
            expect(comments[0].deleted).toEqual(null)
        })
    })

    describe('verifyCommentOwner', () => {
        it('should throw error when comment not found', async () => {
            await UsersTableTestHelper.addUser({})
            await ThreadsTableTestHelper.addThread({})
            await CommentsTableTestHelper.addComment({})

            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => ''
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action & Assert
            expect(() => commentRepositoryPostgres.verifyCommentOwner('comment-1234', 'user-123')).rejects.toThrowError('COMMENT_REPOSITORY.COMMENT_NOT_FOUND')
        })

        it('should throw error when owner is not valid', async () => {
            await UsersTableTestHelper.addUser({})
            await ThreadsTableTestHelper.addThread({})
            await CommentsTableTestHelper.addComment({})

            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => ''
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action & Assert
            expect(() => commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-14')).rejects.toThrowError('COMMENT_REPOSITORY.USER_NOT_COMMENTS_OWNER')
        })

        it('should not throw error when owner is valid', async () => {
            await UsersTableTestHelper.addUser({})
            await ThreadsTableTestHelper.addThread({})
            await CommentsTableTestHelper.addComment({})

            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => ''
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action & Assert
            expect(async () => await commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123')).not.toThrow(Error)
        })
    })

    describe('deleteComment', () => {
        it('should change comment content when deleted', async () => {
            await UsersTableTestHelper.addUser({})
            await ThreadsTableTestHelper.addThread({})
            await CommentsTableTestHelper.addComment({})

            const fakeIdGenerator = () => '123'
            const fakeTimeSetter = () => ''
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeTimeSetter)

            // Action
            await commentRepositoryPostgres.deleteComment('comment-123')
            const comment = await CommentsTableTestHelper.findCommentById('comment-123')
            // Action & Assert
            expect(comment[0].deleted).toEqual(true)
        })
    })
})
