const ThreadsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
    name: 'threads',
    register: async (server, { container }) => {
        const threadhandler = new ThreadsHandler(container)
        server.route(routes(threadhandler))
    }
}
