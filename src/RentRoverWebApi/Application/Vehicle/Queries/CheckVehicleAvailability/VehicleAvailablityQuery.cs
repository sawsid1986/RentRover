using MediatR;

namespace Application.Vehicle.Queries.CheckVehicleAvailability
{
    public class VehicleAvailablityQuery : IRequest<VehicleAvailablityQueryResult>
    {
        public int? VehicleId { get; set; }
        public VehicleAvailablityQueryCriteria Criteria { get; set; }
    }
}
