using Application.Common.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Vehicle.Queries.CheckVehicleAvailability
{
    public class VehicleAvailablityQueryHandler : IRequestHandler<VehicleAvailablityQuery, VehicleAvailablityQueryResult>
    {
        private readonly IApplicationDbContext _context;

        public VehicleAvailablityQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<VehicleAvailablityQueryResult> Handle(VehicleAvailablityQuery request, CancellationToken cancellationToken)
        {
            if (!_context.Vehicles.Any(v => v.Id == request.VehicleId))
            {
                throw new FluentValidation.ValidationException($"Vehicle with ID {request.VehicleId} not found.");
            }

            var VehicleAvailablityQueryResult = new VehicleAvailablityQueryResult();

            VehicleAvailablityQueryResult.IsAvailable = !await _context.VehicleReservations.AnyAsync(v => v.VehicleId == request.VehicleId &&
                ((v.StartDate <= request.Criteria.StartDate && request.Criteria.StartDate < v.EndDate) ||
                (v.StartDate < request.Criteria.EndDate && request.Criteria.EndDate <= v.EndDate)));

            return VehicleAvailablityQueryResult;
        }
    }
}
