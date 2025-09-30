namespace Domain.Entities
{
    public class VehicleReservation
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int CustomerId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public byte  Status { get; set; }
    }
}
