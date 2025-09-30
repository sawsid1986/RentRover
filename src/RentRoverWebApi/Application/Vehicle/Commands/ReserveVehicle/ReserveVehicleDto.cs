
using AutoMapper;
using System.Text.Json.Serialization;

namespace Application.Vehicle.Commands.ReserveVehicle
{
    public class ReserveVehicleDto
    {
        public int? CustomerId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ReservedStatus? Status { get; set; }

        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<ReserveVehicleDto, Domain.Entities.VehicleReservation>()
                    .ForMember(dest => dest.Status, cfg => cfg.MapFrom(src => (byte)src.Status));
            }
        }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ReservedStatus
    {
        Reserved
    }
}
