using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessagesRepository _messagesRepository;
        private readonly IMapper _mapper;
        public MessagesController(IUserRepository userRepository, IMessagesRepository messagesRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _messagesRepository = messagesRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUserName();

            if (username == createMessageDto.RecipientUserName.ToLower()) return BadRequest("You cannot send messages to yourself.");

            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(createMessageDto.RecipientUserName);

            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderName = sender.UserName,
                RecipientName = recipient.UserName,
                Content = createMessageDto.Content
            };

            _messagesRepository.AddMessage(message);

            if (await _messagesRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to send message.");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery] MessagesParams messagesParams)
        {
            messagesParams.Username = User.GetUserName();

            var messages = await _messagesRepository.GetMessagesForUser(messagesParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));

            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUserName = User.GetUserName();

            return Ok(await _messagesRepository.GetMessageThread(currentUserName, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var currentUserName = User.GetUserName();

            var message = await _messagesRepository.GetMessage(id);

            if (message.SenderName != currentUserName && message.RecipientName != currentUserName) return Unauthorized();

            if (message.SenderName == currentUserName) message.SenderDeleted = true;
            if (message.RecipientName == currentUserName) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted)
            {
                _messagesRepository.DeleteMessage(message);
            }

            if (await _messagesRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting the message");
        }
    }
}