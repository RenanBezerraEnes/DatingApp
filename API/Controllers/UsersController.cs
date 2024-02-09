using Microsoft.AspNetCore.Mvc;
using API.Data;


namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly DataContext _context;
    public UsersController(DataContext context)
    {
        _context = context;
    }
}
