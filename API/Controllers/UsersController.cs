using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.interfaces;
using AutoMapper;
using API.DTOs;
using API.Extensions;
using API.Entities;
using API.Helpers;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    public readonly IMapper _mapper;

    private readonly IPhotoService _photoService;
    public UsersController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _photoService = photoService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
    {
        var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUserName());
        userParams.CurrentUsername = User.GetUserName();

        if (string.IsNullOrEmpty(userParams.Gender))
        {
            userParams.Gender = gender == "male" ? "female" : "male";
        }

        var users = await _unitOfWork.UserRepository.GetMembersAsync(userParams);

        Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages));

        return Ok(users);
    }

    [HttpGet("{username}")] //api/users/{id}
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var currentUsername = User.GetUserName();

        return await _unitOfWork.UserRepository.GetMemberAsync(username,
        isCurrentUser: currentUsername == username
        );
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUserName());

        if (user == null) return NotFound();

        _mapper.Map(memberUpdateDto, user);

        if (await _unitOfWork.Complete()) return NoContent();

        return BadRequest("Failed to updated user");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUserName());

        var result = await _photoService.AddPhotoAsync(file);

        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        user.Photos.Add(photo);

        if (await _unitOfWork.Complete())
        {
            return CreatedAtAction(nameof(GetUser),
                new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
        }

        return BadRequest("Problem adding photo");
    }

    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUserName());

        if (user == null) return NotFound();

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("This is already the main photo");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMain != null) currentMain.IsMain = false;
        photo.IsMain = true;

        if (await _unitOfWork.Complete()) return NoContent();

        return BadRequest("Problem setting the main photo");
    }

    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUserName());

        var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("You cannot delete your main photo.");

        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        user.Photos.Remove(photo);

        if (await _unitOfWork.Complete()) return Ok();

        return BadRequest("Problem deleting photo");
    }
}