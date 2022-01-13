const ThreadsTableTestHelper = require( '../../../../tests/ThreadsTableTestHelper' )
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const container = require( '../../container' )
const pool = require('../../database/postgres/pool')
const createServer = require( '../createServer' )

describe('/thread endpoint', () => {
    afterAll(async () => {
        await pool.end()
    })

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable()
        await ThreadsTableTestHelper.cleanTable()
    })

    describe('when POST /thread', () => {
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
})
