const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const CreateThread = require('../../../Domains/threads/entities/CreateThread')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgress')
const pool = require('../../database/postgres/pool')

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable()
        await ThreadsTableTestHelper.cleanTable()
    })

    afterAll(async () => {
        await pool.end()
    })

    describe('Add Thread function', () => {
        it('should presist add thread', async () => {
            console.log('init presists')
            // Arrange
            await UsersTableTestHelper.addUser({})
            const createThread = new CreateThread({
                content: 'dicoding',
                owner: 'user-123'
            })

            const fakeIdGenerator = () => '123'
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            // Action
            await threadRepositoryPostgres.addThread(createThread)

            // Assert
            const thread = await ThreadsTableTestHelper.findThreadById('thread-123')
            expect(thread).toHaveLength(1)
        })

        // it('should return created thread correctly', async () => {
        //     // Arrange
        //     await UsersTableTestHelper.addUser({})
        //     const createThread = new CreateThread({
        //         content: 'dicoding',
        //         owner: 'user-123'
        //     })
        //     const fakeIdGenerator = () => '123'
        //     const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

        //     // Action
        //     const createdRepository = await threadRepositoryPostgres.addThread(createThread)

        //     // Assert
        //     expect(createdRepository).toStrictEqual(new CreatedThreads({
        //         id: 'thread-123',
        //         content: createThread.content,
        //         owner: createThread.owner
        //     }))
        // })
    })
})
