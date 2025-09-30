using MediatR;

namespace Application.Vehicle.Commands.ReserveVehicle
{
    public class ReserveVehicleCommand : IRequest<Unit>
    {
        public int? VehicleId { get; set; }
        public ReserveVehicleDto ReserveVehicle { get; set; }
    }
}
