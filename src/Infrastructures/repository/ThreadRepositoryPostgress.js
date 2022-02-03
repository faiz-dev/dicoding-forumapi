const CreatedThreads = require('../../Domains/threads/entities/CreatedThread')
const ThreadRepository = require('../../Domains/threads/ThreadRepository')

class ThreadRepositoryPostgres extends ThreadRepository {
    constructor (pool, idGenerator, timeSetter) {
        super()
        this._pool = pool
        this._idGenerator = idGenerator
        this._timeSetter = timeSetter
    }

    async addThread (createThread) {
        const { title, body, owner } = createThread
        const id = `thread-${this._idGenerator()}`
        const createdAt = this._timeSetter()

        const query = {
            text: 'INSERT INTO threads (id, title, body, owner, created_at)VALUES($1, $2, $3, $4, $5) RETURNING id, title, body, owner, created_at',
            values: [id, title, body, owner, createdAt]
        }

        const result = await this._pool.query(query)
        return new CreatedThreads({ ...result.rows[0] })
    }

    async verifyThreadAvailability (id) {
        const query = {
            text: 'SELECT id FROM threads WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query)
        if (result.rowCount === 0) {
            throw new Error('THREAD_REPOSITORY.THREAD_NOT_FOUND')
        }
    }

    async getThreadById (id) {
        const query = {
            text: 'SELECT threads.*, users.username FROM threads LEFT JOIN users ON threads.owner=users.id WHERE threads.id=$1',
            values: [id]
        }

        const result = await this._pool.query(query)
        if (result.rowCount === 0) {
            throw new Error('THREAD_REPOSITORY.THREAD_NOT_FOUND')
        }
        return result.rows[0]
    }
}

module.exports = ThreadRepositoryPostgres
