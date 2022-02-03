const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const CreateThread = require('../../../Domains/threads/entities/CreateThread')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgress')
const pool = require('../../database/postgres/pool')
const CreatedThreads = require('../../../Domains/threads/entities/CreatedThread')

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
            // Arrange
            await UsersTableTestHelper.addUser({})
            const createThread = new CreateThread({
                title: 'dicoding',
                body: 'Thread dicoding',
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

        it('should return created thread correctly', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({})
            const createThread = new CreateThread({
                title: 'dicoding',
                body: 'Thread dicoding',
                owner: 'user-123'
            })
            const fakeIdGenerator = () => '123'
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            // Action
            const createdRepository = await threadRepositoryPostgres.addThread(createThread)

            // Assert
            expect(createdRepository).toStrictEqual(new CreatedThreads({
                id: 'thread-123',
                title: createThread.title,
                body: createThread.body,
                owner: createThread.owner
            }))
        })
    })
})
