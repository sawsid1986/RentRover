using Application.Vehicle.Commands.AddVehicle;
using Application.Vehicle.Commands.ReserveVehicle;
using Application.Vehicle.Queries.CheckVehicleAvailability;
using Application.Vehicle.Queries.GetVehicles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]    
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly ILogger<VehiclesController> _logger;

        public VehiclesController(ILogger<VehiclesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<VehicleDto>> GetAsync(ISender sender)
        {
            return await sender.Send(new GetVehiclesQuery());
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddVehicleDto addVehicleDto, [FromServices] ISender sender)
        {
            await sender.Send(new AddVehicleCommand() { AddVehicleDto = addVehicleDto });
            return Ok();
        }

        [HttpPost("{vehicleId}/reserve")]
        public async Task<IActionResult> Reserve([FromRoute] int vehicleId, [FromBody] ReserveVehicleDto reserveVehicleDto, [FromServices] ISender sender)
        {
            await sender.Send(new ReserveVehicleCommand { VehicleId=vehicleId, ReserveVehicle = reserveVehicleDto });
            return Ok();
        }

        [HttpPost("{vehicleId}/checkavailability")]
        public async Task<VehicleAvailablityQueryResult> CheckAvailability([FromRoute] int vehicleId, [FromBody] VehicleAvailablityQueryCriteria criteria, [FromServices] ISender sender)
        {
            return await sender.Send(new VehicleAvailablityQuery { VehicleId = vehicleId, Criteria = criteria });
        }
    }
}
