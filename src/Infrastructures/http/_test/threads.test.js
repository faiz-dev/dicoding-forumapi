const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const container = require('../../container')
const pool = require('../../database/postgres/pool')
const JwtTokenManager = require('../../security/JwtTokenManager')
const createServer = require('../createServer')
const Jwt = require('@hapi/jwt')

describe('/thread endpoint', () => {
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
    })

    describe('when POST /threads', () => {
        it('should response 201 and presisted thread', async () => {
            const requestPayload = {
                title: 'Dicoding Indoneisa',
                body: 'Body Dicoding Indonesia'
            }

            const server = await createServer(container)

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // Assert
            const responseJson = JSON.parse(response.payload)
            expect(response.statusCode).toEqual(201)
            expect(responseJson.status).toEqual('success')
            expect(responseJson.data.addedThread)
        })
    })

    describe('when GET /threads', () => {
        it('should response 200 and return thread detail', async () => {
            const thread = await ThreadsTableTestHelper.addThread({})
            await CommentsTableTestHelper.addComment({})

            const server = await createServer(container)

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/threads/${thread.id}`
            })

            // Assert
            const responseJson = JSON.parse(response.payload)
            expect(response.statusCode).toEqual(200)
            expect(responseJson.data.thread).toBeDefined()
            expect(responseJson.data.thread.comments).toHaveLength(1)
        })
    })
})
