class CreateThread {
    constructor (payload) {
        const { title } = payload

        this._verifyPayload(payload)

        this.title = title
    }

    _verifyPayload ({ title }) {
        if (!title || title === '') {
            throw new Error('CREATE_THREADS.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof title !== 'string') {
            throw new Error('CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = CreateThread
