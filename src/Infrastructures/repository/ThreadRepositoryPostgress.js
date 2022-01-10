const CreatedThreads = require('../../Domains/threads/entities/CreatedThread')
const ThreadRepository = require('../../Domains/threads/ThreadRepository')

class ThreadRepositoryPostgres extends ThreadRepository {
    constructor (pool, idGenerator) {
        super()
        this._pool = pool
        this._idGenerator = idGenerator
    }

    async addThread (createThread) {
        const { content, owner } = createThread
        const id = `thread-${this._idGenerator()}`

        const query = {
            text: 'INSERT INTO threads (id, content, owner)VALUES($1, $2, $3) RETURNING id, content, owner',
            values: [id, content, owner]
        }

        const result = await this._pool.query(query)
        return new CreatedThreads({ ...result.rows[0] })
    }
}

module.exports = ThreadRepositoryPostgres
