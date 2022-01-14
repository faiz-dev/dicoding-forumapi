/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const CommentsTableTestHelper = {
    async addComment ({
        id = 'comment-123',
        content = 'dicoding',
        threadId = 'thread-123',
        createdBy = 'user-123',
        createdAt = new Date().getMilliseconds()
    }) {
        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5)',
            values: [id, content, threadId, createdBy, createdAt]
        }

        await pool.query(query)
    },

    async findCommentById (id) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id]
        }

        const result = await pool.query(query)
        console.log('RR', result.rows)
        return result.rows
    },

    async cleanTable () {
        await pool.query('DELETE FROM comments WHERE 1=1')
    }
}

module.exports = CommentsTableTestHelper
