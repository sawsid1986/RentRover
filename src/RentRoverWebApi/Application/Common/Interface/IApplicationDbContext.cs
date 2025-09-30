using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interface
{
    public interface IApplicationDbContext
    {
        DbSet<Domain.Entities.Vehicle> Vehicles { get; }
        DbSet<Domain.Entities.LoginUser> LoginUsers { get; }
        DbSet<Domain.Entities.VehicleReservation> VehicleReservations { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
