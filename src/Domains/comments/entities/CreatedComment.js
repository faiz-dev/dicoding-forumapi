class CreatedComment {
    constructor (payload) {
        this._verifyPayload(payload)
        const { id, content, createdAt, threadId, createdBy } = payload

        this.id = id
        this.content = content
        this.createdAt = createdAt
        this.threadId = threadId
        this.owner = createdBy
    }

    _verifyPayload ({ id, content, createdAt, threadId, createdBy }) {
        if (!id || !content || !createdAt || !threadId || !createdBy) {
            throw new Error('CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof id !== 'string' ||
             typeof content !== 'string' ||
             typeof createdAt !== 'string' ||
             typeof threadId !== 'string' ||
             typeof createdBy !== 'string') {
            throw new Error('CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = CreatedComment
