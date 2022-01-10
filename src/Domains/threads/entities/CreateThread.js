class CreateThread {
    constructor (payload) {
        const { content, owner } = payload

        this._verifyPayload(payload)

        this.content = content
        this.owner = owner
    }

    _verifyPayload ({ content, owner }) {
        if (!content || !owner) {
            throw new Error('CREATE_THREADS.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof content !== 'string' || typeof owner !== 'string') {
            throw new Error('CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = CreateThread
