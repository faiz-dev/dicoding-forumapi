/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const CommentsTableTestHelper = {
    async addComment ({
        id = 'comment-123',
        content = 'dicoding',
        threadId = 'thread-123',
        createdBy = 'user-123',
        createdAt = '1644888695373'
    }) {
        const query = {
            text: 'INSERT INTO comments (id, content, thread_id, created_by, created_at)VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, content, threadId, createdBy, createdAt]
        }

        const result = await pool.query(query)

        return result.rows[0]
    },

    async findCommentById (id) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id]
        }

        const result = await pool.query(query)
        return result.rows
    },

    async cleanTable () {
        await pool.query('DELETE FROM comments WHERE 1=1')
    }
}

module.exports = CommentsTableTestHelper
