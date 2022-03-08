exports.up = pgm => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        content: {
            type: 'TEXT',
            notNull: true
        },
        thread_id: {
            type: 'VARCHAR(50)'
        },
        created_by: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        created_at: {
            type: 'VARCHAR(20)'
        },
        deleted: {
            type: 'BOOLEAN'
        }
    })
    pgm.addConstraint(
        'comments',
        'fk_comments.thread_id_threads.id',
        'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE'
    )

    pgm.addConstraint(
        'comments',
        'fk_comments.created_by_users.id',
        'FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE CASCADE'
    )
}

exports.down = pgm => {
    pgm.dropTable('comments')
}
