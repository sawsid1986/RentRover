
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{

    public class ApplicationDbContextInitialiser
    {
        private readonly ILogger<ApplicationDbContextInitialiser> _logger;
        private readonly ApplicationDbContext _context;

        public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                // See https://jasontaylor.dev/ef-core-database-initialisation-strategies
                await _context.Database.EnsureDeletedAsync();
                await _context.Database.EnsureCreatedAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        public async Task TrySeedAsync()
        {

            // Default data
            // Seed, if necessary
            if (!_context.Vehicles.Any())
            {
                await _context.Vehicles.AddRangeAsync(
                    [
                        new Domain.Entities.Vehicle
                        {
                            Name = "Car 1",
                            Brand = "Toyota",
                            Model = "Corolla",
                            Year = 2020,
                            Price = 20000
                        }, new Domain.Entities.Vehicle
                        {
                            Name = "Car 2",
                            Brand = "Toyota",
                            Model = "Corolla",
                            Year = 2020,
                            Price = 19000
                        }]
                );

                await _context.SaveChangesAsync();
            }

            if (!_context.LoginUsers.Any())
            {
                await _context.LoginUsers.AddRangeAsync(
                    [
                        new Domain.Entities.LoginUser
                        {
                            UserName = "testadmin1",
                            Email = "admin@rentrover.com",
                            Password = "TestAdmin@123"
                        }]
                );

                await _context.SaveChangesAsync();
            }
        }
    }
}