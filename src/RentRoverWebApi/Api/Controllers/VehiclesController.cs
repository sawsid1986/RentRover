using Application.Vehicle.Queries;
using MediatR;
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
    }
}
