using Application.Common.Interface;
using AutoMapper;
using Domain.Exceptions;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Users.Commands.RegisterUser
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<RegisterUserCommandHandler> _logger;

        public RegisterUserCommandHandler(IApplicationDbContext dbContext, IMapper mapper, ILogger<RegisterUserCommandHandler> logger)
        {
            _context = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _context.LoginUsers.Add(_mapper.Map<Domain.Entities.LoginUser>(request.RegisterUserDto));
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx && (sqlEx.Number == 2601 || sqlEx.Number == 2627))
                {
                    // Handle unique constraint violation (e.g., log, return specific error)
                    _logger.LogWarning("Unique constraint violation: Duplicate record.");
                    throw new DuplicateRequestException("Duplicate Register User Request", ex);
                }
                else
                {
                    throw; // Re-throw other types of DbUpdateException
                }
            }

        }
    }
}
