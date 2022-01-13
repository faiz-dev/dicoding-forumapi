// const CreatedThreads = require('../../../Domains/threads/entities/CreatedThread')
const CreatedThreads = require('../../../Domains/threads/entities/CreatedThread')
const CreateThread = require('../../../Domains/threads/entities/CreateThread')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const AddThreadUseCase = require('../AddThreadUseCase')

describe('AddThreaduseCase', () => {
    it('should orchestrating the add user action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'New Thread',
            body: 'body New Thread',
            owner: 'user-123'
        }

        const expectedCreatedThread = new CreatedThreads({
            id: 'thread-123',
            title: useCasePayload.title,
            body: useCasePayload.body,
            owner: useCasePayload.owner
        })

        // Creating Dependency of use case
        const mockThreadRepository = new ThreadRepository()

        // Mocking needed functions
        mockThreadRepository.addThread = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedCreatedThread))

        // Creating Use Case Instance
        const addThreadUseCase = new AddThreadUseCase({ threadRepository: mockThreadRepository })

        // Action
        const createdThread = await addThreadUseCase.execute(useCasePayload)

        // Assert
        expect(createdThread).toStrictEqual(expectedCreatedThread)
        expect(mockThreadRepository.addThread).toBeCalledWith(new CreateThread({
            title: useCasePayload.title,
            body: useCasePayload.body,
            owner: useCasePayload.owner
        }))
    })
})
