
class GetThreadUseCase {
    constructor ({ threadRepository, commentRepository }) {
        this._threadRepository = threadRepository
        this._commentRepository = commentRepository
    }

    async execute (threadId) {
        await this._threadRepository.verifyThreadAvailability(threadId)
        const thread = await this._threadRepository.getThreadById(threadId)
        const comments = await this._commentRepository.getCommentsByThreadId(threadId)
        return {
            id: thread.id,
            title: thread.title,
            body: thread.body,
            date: new Date(thread.created_at * 1000).toISOString(),
            username: thread.username,
            comments: comments.map(c => ({
                id: c.id,
                username: c.username,
                date: new Date(c.created_at * 1000).toISOString(),
                content: c.deleted ? '**komentar telah dihapus**' : c.content
            }))
        }
    }
}

module.exports = GetThreadUseCase
