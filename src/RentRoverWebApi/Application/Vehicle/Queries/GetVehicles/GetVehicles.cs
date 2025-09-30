using Application.Common.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Vehicle.Queries.GetVehicles
{
    public record GetVehiclesQuery : IRequest<IReadOnlyCollection<VehicleDto>>;

    public class GetVehiclesQueryHandler : IRequestHandler<GetVehiclesQuery, IReadOnlyCollection<VehicleDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetVehiclesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IReadOnlyCollection<VehicleDto>> Handle(GetVehiclesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Vehicles
                 .AsNoTracking()
                 .ProjectTo<VehicleDto>(_mapper.ConfigurationProvider)
                 .OrderByDescending(t => t.Year)
                 .ToListAsync(cancellationToken);
        }
    }
}
