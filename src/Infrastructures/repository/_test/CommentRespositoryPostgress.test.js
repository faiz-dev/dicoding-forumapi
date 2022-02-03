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
            console.log('INSERTED COMMENT: ', comment)
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
})
