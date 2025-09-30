using Application.Common.Interface;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Vehicle.Commands.AddVehicle
{
    public class AddVehicleCommandHandler : IRequestHandler<AddVehicleCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<AddVehicleCommandHandler> _logger;

        public AddVehicleCommandHandler(IApplicationDbContext dbContext, IMapper mapper, ILogger<AddVehicleCommandHandler> logger)
        {
            _context = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Unit> Handle(AddVehicleCommand request, CancellationToken cancellationToken)
        {
            _context.Vehicles.Add(_mapper.Map<Domain.Entities.Vehicle>(request.AddVehicleDto));
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
