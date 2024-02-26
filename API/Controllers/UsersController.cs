using Microsoft.AspNetCore.Mvc;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using API.interfaces;


namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    public readonly IUserRepository _userRepository;
    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return Ok(await _userRepository.GetUsersAsync());

    }

    [HttpGet("{username}")] //api/users/{id}
    public async Task<ActionResult<AppUser>> GetUser(string username)
    {
        return await _userRepository.GetUserByUsernameAsync(username);
    }
}
