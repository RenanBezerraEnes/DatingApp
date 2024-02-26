using Microsoft.AspNetCore.Mvc;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using API.interfaces;
using AutoMapper;
using API.DTOs;


namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    public readonly IUserRepository _userRepository;
    public readonly IMapper _mapper;
    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await _userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{username}")] //api/users/{id}
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        return await _userRepository.GetMemberAsync(username);
    }
}
