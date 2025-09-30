using MediatR;

namespace Application.Vehicle.Commands.AddVehicle
{
    public class AddVehicleCommand : IRequest<Unit>
    {
        public AddVehicleDto AddVehicleDto { get; set; }
    }
}
