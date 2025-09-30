using AutoMapper;

namespace Application.Vehicle.Commands.AddVehicle
{
    public class AddVehicleDto
    {
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int? Year { get; set; }
        public double? Price { get; set; }

        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<AddVehicleDto, Domain.Entities.Vehicle>();
            }
        }
    }
}
