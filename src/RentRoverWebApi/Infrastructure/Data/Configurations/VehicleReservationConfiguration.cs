using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class VehicleReservationConfiguration : IEntityTypeConfiguration<VehicleReservation>
    {
        public void Configure(EntityTypeBuilder<VehicleReservation> builder)
        {
            builder.Property(t => t.VehicleId)
                .IsRequired();
            builder.Property(t => t.CustomerId)
                .IsRequired();
            builder.Property(t => t.StartDate)
                .IsRequired();
            builder.Property(t => t.EndDate).IsRequired();
            builder.Property(t => t.Status).IsRequired();
        }
    }
}
