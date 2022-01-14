const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const CreateComment = require('../../../Domains/comments/entities/CreateComment')
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment')
const pool = require('../../database/postgres/pool')
const CommentRepositoryPostgres = require('../ComentRespositoryPostgress')

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
            const createComment = new CreateComment({
                content: 'comment 1',
                threadId: addThread.id,
                createdBy: addUser.id
            })

            const fakeIdGenerator = () => '123'
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)

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
            const createComment = new CreateComment({
                content: 'comment 1',
                threadId: addThread.id,
                createdBy: addUser.id
            })

            const fakeIdGenerator = () => '123'
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)

            // Action
            const createdComment = await commentRepositoryPostgres.addComment(createComment)

            // Assert
            expect(createdComment).toBeInstanceOf(CreatedComment)
            expect(createdComment.id).toEqual('comment-123')
            expect(createdComment.content).toEqual(createComment.content)
            expect(createdComment.threadId).toEqual(createComment.threadId)
            expect(createdComment.createdBy).toEqual(createComment.createdBy)
        })
    })
})
