using Api.Infrastructure;
using Application.Users.Commands.LoginUser;
using Application.Users.Commands.RegisterUser;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto registerUserDto, [FromServices] ISender sender)
        {
            await sender.Send(new RegisterUserCommand { RegisterUserDto = registerUserDto });
            return Ok();
        }

        [HttpPost("Authenticate")]
        public async Task<Ok<string>> Authenticate([FromBody] LoginUserDto loginUserDto, [FromServices] JwtHelper jwtHelper, [FromServices] ISender sender)
        {
            await sender.Send(new LoginUserCommand { LoginUserDto = loginUserDto });

            return TypedResults.Ok(jwtHelper.GenerateJwtToken(loginUserDto.UserName));
        }
    }

}
