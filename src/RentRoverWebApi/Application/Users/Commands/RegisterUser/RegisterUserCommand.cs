using Application.Vehicle.Queries;
using MediatR;

namespace Application.Users.Commands.RegisterUser
{
    public class RegisterUserCommand : IRequest<Unit>
    {
        public RegisterUserDto RegisterUserDto { get; set; }
    }
}
