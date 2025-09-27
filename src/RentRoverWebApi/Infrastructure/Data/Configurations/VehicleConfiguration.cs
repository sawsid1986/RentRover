using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.Property(t => t.Name)
                .HasMaxLength(200)
                .IsRequired();
            builder.Property(t => t.Brand)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(t => t.Model)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(t => t.Year).IsRequired();
            builder.Property(t => t.Price).IsRequired();

        }
    }
}
