class CreateComment {
    constructor (payload) {
        this._validatePayload(payload)
        const { content, threadId, createdBy } = payload

        this.content = content
        this.threadId = threadId
        this.createdBy = createdBy
    }

    _validatePayload ({ content, threadId, createdBy }) {
        if (!content || !threadId || !createdBy) {
            throw new Error('CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof content !== 'string' || typeof threadId !== 'string' || typeof createdBy !== 'string') {
            throw new Error('CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = CreateComment
