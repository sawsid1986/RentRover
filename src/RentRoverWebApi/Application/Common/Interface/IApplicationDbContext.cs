using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interface
{
    public interface IApplicationDbContext
    {
        DbSet<Domain.Entities.Vehicle> Vehicles { get; }
    }
}
