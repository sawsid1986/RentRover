using AutoMapper;

namespace Application.Vehicle.Queries
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public double Price { get; set; }

        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Domain.Entities.Vehicle, VehicleDto>();
            }
        }
    }
}
