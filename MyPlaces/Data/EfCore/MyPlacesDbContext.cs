using Microsoft.EntityFrameworkCore;
using MyPlaces.Data.Models;

namespace MyPlaces.Data.EfCore
{
    public class MyPlacesDbContext : DbContext
    {
        public DbSet<City> Cities { get; set; }

        public MyPlacesDbContext(DbContextOptions<MyPlacesDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder b)
        {
            base.OnModelCreating(b);

            b.Entity<City>(e =>
            {
                e.ToTable("Cities");

                e.Property(p => p.Id).ValueGeneratedNever();
                e.Property(p => p.Name).HasMaxLength(100);

                e.Property(p => p.Latitude).HasPrecision(10, 8);
                e.Property(p => p.Longitude).HasPrecision(11, 8);

                e.HasMany<GMPlace>(p => p.GMPlaces).WithOne(place => place.City);
            });

            b.Entity<GMPlace>(e =>
            {
                e.ToTable("GMPlaces");

                e.Property(p => p.Id).ValueGeneratedNever();
                e.Property(p => p.Name).HasMaxLength(100);
            });
        }
    }
}
