using MediatR;

namespace Application.Users.Commands.LoginUser
{
    public class LoginUserCommand : IRequest<Unit>
    {
        public LoginUserDto LoginUserDto { get; set; }
    }
}
