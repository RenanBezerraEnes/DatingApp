using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.interfaces
{
    public interface IMessagesRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessagesParams messagesParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string senderName, string recipientName);
        Task<bool> SaveAllAsync();
        void AddGroup(Group group);
        void RemoveConnection(Connection connection);
        Task<Connection> GetConnection(string connectionId);
        Task<Group> GetMessageGroup(string groupName);
    }
}