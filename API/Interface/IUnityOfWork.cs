namespace API.interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IMessagesRepository MessageRepository { get; }
    ILikesRepository LikesRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}