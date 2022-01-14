const CommentRepository = require('../../Domains/comments/CommentRepository')
const CreatedComment = require('../../Domains/comments/entities/CreatedComment')

class CommentRepositoryPostgres extends CommentRepository {
    constructor (pool, idGenerator) {
        super()
        this._pool = pool
        this._idGenerator = idGenerator
    }

    async addComment (createComment) {
        const { content, threadId, createdBy } = createComment
        const id = `comment-${this._idGenerator()}`
        const createdAt = new Date().getMilliseconds()

        const query = {
            text: 'INSERT INTO comments (id, content, thread_id, created_by, created_at) VALUES ($1, $2, $3, $4, $5) returning id, content, thread_id, created_by, created_at',
            values: [id, content, threadId, createdBy, createdAt]
        }

        const result = await this._pool.query(query)
        const res = { ...result.rows[0] }
        console.log('RS Comment', result)
        return new CreatedComment({
            ...res,
            threadId: res.thread_id,
            createdBy: res.created_by,
            createdAt: res.created_at
        })
    }

    getCommentById (id) {

    }
}

module.exports = CommentRepositoryPostgres
