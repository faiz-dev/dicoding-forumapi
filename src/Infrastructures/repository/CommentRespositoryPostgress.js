const CommentRepository = require('../../Domains/comments/CommentRepository')
const CreatedComment = require('../../Domains/comments/entities/CreatedComment')

class CommentRepositoryPostgres extends CommentRepository {
    constructor (pool, idGenerator, timeSetter) {
        super()
        this._pool = pool
        this._idGenerator = idGenerator
        this._timeSetter = timeSetter
    }

    async addComment (createComment) {
        const { content, threadId, createdBy } = createComment
        const id = `comment-${this._idGenerator()}`
        const createdAt = this._timeSetter()
        const query = {
            text: 'INSERT INTO comments (id, content, thread_id, created_by, created_at) VALUES ($1, $2, $3, $4, $5) returning id, content, thread_id, created_by, created_at',
            values: [id, content, threadId, createdBy, createdAt]
        }

        const result = await this._pool.query(query)
        const res = { ...result.rows[0] }
        return new CreatedComment({
            ...res,
            threadId: res.thread_id,
            createdBy: res.created_by,
            createdAt: res.created_at
        })
    }

    async getCommentsByThreadId (threadId) {
        const query = {
            text: 'SELECT comments.*, users.username FROM comments LEFT JOIN users ON comments.created_by=users.id WHERE thread_id=$1',
            values: [threadId]
        }

        const result = await this._pool.query(query)
        return result.rows
    }

    async verifyCommentOwner (id, createdBy) {
        const query = {
            text: 'SELECT created_by FROM comments WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query)

        if (result.rowCount === 0) {
            throw new Error('COMMENT_REPOSITORY.COMMENT_NOT_FOUND')
        }
        if (result.rows[0].created_by !== createdBy) {
            throw new Error('COMMENT_REPOSITORY.USER_NOT_COMMENTS_OWNER')
        }
    }

    async deleteComment (id) {
        const query = {
            text: 'UPDATE comments SET deleted=true WHERE id=$1',
            values: [id]
        }

        await this._pool.query(query)
    }
}

module.exports = CommentRepositoryPostgres
