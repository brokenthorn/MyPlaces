using Microsoft.Extensions.Logging;
using MyPlaces.Data.EfCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyPlaces.Data.Entities
{
    public static class DatabaseSeeder
    {
        public static void Seed(MyPlacesDbContext db, ILogger<MyPlacesDbContext> log)
        {
            log.LogInformation("Seeding database with initial data");

            if (db.Cities.Any())
            {
                log.LogInformation("Cities table is not empty, seeding cities has been skipped");
                return;
            }

            var cities = new City[]
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Tulcea, Municipiul Tulcea, România",
                    Latitude=45.1797131822053M,
                    Longitude=28.804494130291598M,
                    GMPlaces = new List<GMPlace>(0)
                },
            };

            db.AddRange(cities);
            db.SaveChanges();

            log.LogInformation("Cities have been seeded");
        }
    }
}
