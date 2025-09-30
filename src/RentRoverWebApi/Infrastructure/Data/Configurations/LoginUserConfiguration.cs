using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class LoginUserConfiguration : IEntityTypeConfiguration<LoginUser>
    {
        public void Configure(EntityTypeBuilder<LoginUser> builder)
        {
            builder.HasIndex(t => t.UserName).IsUnique();
            builder.HasIndex(t => t.Email).IsUnique();

            builder.Property(t => t.UserName)
                .HasMaxLength(50)                
                .IsRequired();

            builder.Property(t => t.Email)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(t => t.Password)
                .HasMaxLength(200)
                .IsRequired();
        }
    }
}
