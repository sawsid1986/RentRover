using FluentValidation;

namespace Application.Users.Commands.LoginUser
{
    public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
    {
        public LoginUserCommandValidator()
        {
            RuleFor(p => p.LoginUserDto).NotNull();
            RuleFor(p => p.LoginUserDto.UserName).NotEmpty().MinimumLength(10);            
            RuleFor(p => p.LoginUserDto.Password).NotEmpty().MinimumLength(10);
        }
    }
}
