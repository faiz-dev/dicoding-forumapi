
class GetThreadUseCase {
    constructor ({ threadRepository, commentRepository }) {
        this._threadRepository = threadRepository
        this._commentRepository = commentRepository
    }

    async execute (threadId) {
        const thread = await this._threadRepository.getThreadById(threadId)
        console.log(thread)
        const comments = await this._commentRepository.getCommentsByThreadId(threadId)
        const ret = {
            id: thread.id,
            title: thread.title,
            body: thread.body,
            date: thread.created_at ? new Date(thread.created_at * 1000).toISOString() : '',
            username: thread.username,
            comments: comments.map(c => ({
                id: c.id,
                username: c.username,
                date: c.created_at ? new Date(c.created_at * 1000).toISOString() : '',
                content: c.content
            }))
        }
        return ret
    }
}

module.exports = GetThreadUseCase
