using Application.Common.Interface;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Vehicle.Commands.ReserveVehicle
{
    public class ReserveVehicleCommandHandler : IRequestHandler<ReserveVehicleCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<ReserveVehicleCommandHandler> _logger;

        public ReserveVehicleCommandHandler(IApplicationDbContext dbContext, IMapper mapper, ILogger<ReserveVehicleCommandHandler> logger)
        {
            _context = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Unit> Handle(ReserveVehicleCommand request, CancellationToken cancellationToken)
        {
            if (!await _context.Vehicles.AnyAsync(v => v.Id == request.VehicleId))
            {
                throw new FluentValidation.ValidationException($"Vehicle with ID {request.VehicleId} not found.");
            }

            if (await _context.VehicleReservations.AnyAsync(v => v.VehicleId == request.VehicleId &&
                ((v.StartDate <= request.ReserveVehicle.StartDate && request.ReserveVehicle.StartDate < v.EndDate) ||
                (v.StartDate < request.ReserveVehicle.EndDate && request.ReserveVehicle.EndDate <= v.EndDate))))
            {
                throw new FluentValidation.ValidationException($"Vehicle with ID {request.VehicleId} cannot be booked with given date");
            }

            var vehicleReservation = _mapper.Map<Domain.Entities.VehicleReservation>(request.ReserveVehicle);
            vehicleReservation.VehicleId = request.VehicleId.Value;
            _context.VehicleReservations.Add(vehicleReservation);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
