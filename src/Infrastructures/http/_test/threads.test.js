const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const container = require('../../container')
const pool = require('../../database/postgres/pool')
const createServer = require('../createServer')

describe('/thread endpoint', () => {
    afterAll(async () => {
        await pool.end()
    })

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable()
        await ThreadsTableTestHelper.cleanTable()
    })

    describe('when POST /threads', () => {
        it('should response 201 and presisted thread', async () => {
            await UsersTableTestHelper.addUser({})

            const requestPayload = {
                title: 'Dicoding Indoneisa',
                body: 'Body Dicoding Indonesia',
                owner: 'user-123'
            }

            const server = await createServer(container)

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload
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
            await UsersTableTestHelper.addUser({})
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
