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
            const timeSetter = () => new Date().getTime()
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator, timeSetter)

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
            const timeSetter = () => new Date().getTime()
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator, timeSetter)

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

    describe('verifyThreadAvailability', () => {
        it('throw error when thread not found', async () => {
            const fakeIdGenerator = () => '123'
            const timeSetter = () => new Date().getTime()
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator, timeSetter)

            // Action
            expect(async () => await threadRepositoryPostgres.verifyThreadAvailability('no-id')).rejects.toThrowError('THREAD_REPOSITORY.THREAD_NOT_FOUND')
        })

        it('should not throw error when thread found', async () => {
            await UsersTableTestHelper.addUser({})
            await ThreadsTableTestHelper.addThread({})

            const fakeIdGenerator = () => '123'
            const timeSetter = () => new Date().getTime()
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator, timeSetter)

            // Action
            expect(async () => await threadRepositoryPostgres.verifyThreadAvailability('thread-123')).not.toThrow(Error)
        })
    })

    describe('getThreadById', () => {
        it('return correct data object when thread found', async () => {
            await UsersTableTestHelper.addUser({})
            await ThreadsTableTestHelper.addThread({})

            const fakeIdGenerator = () => '123'
            const timeSetter = () => new Date().getTime()
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator, timeSetter)
            const thread = await threadRepositoryPostgres.getThreadById('thread-123')

            // Action
            expect(thread).toBeInstanceOf(Object)
            expect(thread.id).toEqual('thread-123')
            expect(thread.title).toEqual('dicoding')
            expect(thread.body).toEqual('dicoding')
            expect(thread.owner).toEqual('user-123')
            expect(thread.created_at).toEqual('1644888695373')
            expect(thread.username).toEqual('dicoding')
        })
    })
})
