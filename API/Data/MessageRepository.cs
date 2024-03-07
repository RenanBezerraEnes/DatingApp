using API.DTOs;
using API.Entities;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessagesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessagesParams messagesParams)
        {
            var query = _context.Messages
                .OrderByDescending(x => x.MessageSent)
                .AsQueryable();

            query = messagesParams.Container switch
            {
                "Inbox" => query.Where(u => u.RecipientName == messagesParams.Username),
                "Outbox" => query.Where(u => u.SenderName == messagesParams.Username),
                _ => query.Where(u => u.RecipientName == messagesParams.Username && u.DateRead == null)
            };

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDto>.CreateAsync(messages, messagesParams.PageNumber, messagesParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string senderName, string recipientName)
        {
            var messages = await _context.Messages
                .Include(m => m.Sender).ThenInclude(p => p.Photos)
                .Include(m => m.Recipient).ThenInclude(p => p.Photos)
                .Where(
                    m => m.RecipientName == senderName &&
                    m.SenderName == recipientName ||
                    m.RecipientName == recipientName &&
                    m.SenderName == senderName
                )
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();

            var unreadMessages = messages.Where(m => m.DateRead == null
                && m.RecipientName == senderName).ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}