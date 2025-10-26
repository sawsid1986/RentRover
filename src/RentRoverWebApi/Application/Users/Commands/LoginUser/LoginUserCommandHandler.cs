using Application.Common.Interface;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Users.Commands.LoginUser
{
    internal class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<LoginUserCommandHandler> _logger;
        public LoginUserCommandHandler(IApplicationDbContext dbContext, IMapper mapper, ILogger<LoginUserCommandHandler> logger)
        {
            _context = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Unit> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            if (!await _context.LoginUsers.AnyAsync(v => v.UserName == request.LoginUserDto.UserName && v.Password == request.LoginUserDto.Password))
            {
                throw new FluentValidation.ValidationException($"UserName or Password is incorrect.");
            }
            return Unit.Value;
        }
    }
}
