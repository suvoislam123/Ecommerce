using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Infrastructure.Identity
{
    /*dotnet ef migrations add IdentityInitial -p Infrastructure -s API -o Identity/Migrations -c AppIdentityDbContext*/
    /*dotnet ef migrations remove -p Infrastructure -s API  -c AppIdentityDbContext*/
    public class AppIdentityDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<AppUser> AppUsers { get;set; }
        public DbSet<Address> Addresses { get; set; }
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> option) : base(option)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
