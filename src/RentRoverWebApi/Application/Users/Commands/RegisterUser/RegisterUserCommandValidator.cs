using FluentValidation;

namespace Application.Users.Commands.RegisterUser
{
    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        private const string EmailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

        public RegisterUserCommandValidator()
        {
            RuleFor(p => p.RegisterUserDto).NotNull();
            RuleFor(p => p.RegisterUserDto.UserName).NotEmpty().MinimumLength(10);
            RuleFor(p => p.RegisterUserDto.Email).NotEmpty().Matches(EmailRegex);
            RuleFor(p => p.RegisterUserDto.Password).NotEmpty().MinimumLength(10);

        }
    }
}
