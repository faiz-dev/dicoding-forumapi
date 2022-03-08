const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const pool = require('../../database/postgres/pool')
const createServer = require('../createServer')
const container = require('../../container')
const JwtTokenManager = require('../../security/JwtTokenManager')
const Jwt = require('@hapi/jwt')

describe('/comments endpoint', () => {
    let token = ''
    beforeAll(async () => {
        await UsersTableTestHelper.cleanTable()
        await UsersTableTestHelper.addUser({})
        const tokenManager = new JwtTokenManager(Jwt.token)
        token = await tokenManager.createAccessToken({ username: 'user-123', id: 'user-123' })
    })

    afterAll(async () => {
        await UsersTableTestHelper.cleanTable()
        await pool.end()
    })

    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable()
        await CommentsTableTestHelper.cleanTable()
    })

    describe('when post /thread/{threadId}/comments', () => {
        it('should response 201 and create comments', async () => {
            const thread = await ThreadsTableTestHelper.addThread({})

            const requestPayload = {
                content: 'comment1'
            }

            const server = await createServer(container)

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${thread.id}/comments`,
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // Assert
            const responseJson = JSON.parse(response.payload)
            expect(response.statusCode).toEqual(201)
            expect(responseJson.status).toEqual('success')
            expect(responseJson.data.addedComment).toBeDefined()
        })
    })

    describe('when delete /thread/{threadId}/comments/{commentsId}', () => {
        it('should response 200 and delete comment', async () => {
            // Arrange
            // await UsersTableTestHelper.addUser({})
            const thread = await ThreadsTableTestHelper.addThread({})
            const comment = await CommentsTableTestHelper.addComment({})

            const server = await createServer(container)

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${thread.id}/comments/${comment.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const resultCheck = await UsersTableTestHelper.findUsersById('comment-123')
            // Assert
            expect(resultCheck).toHaveLength(0)
            const responseJson = JSON.parse(response.payload)
            expect(response.statusCode).toEqual(200)
            expect(responseJson.status).toEqual('success')
        })
    })
})
