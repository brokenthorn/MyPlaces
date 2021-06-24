using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyPlaces.Data.EfCore;
using MyPlaces.Data.Entities;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MyPlaces.Data.Repositories
{
    public class CityRepository : IRepository<City>
    {
        private MyPlacesDbContext _db;
        private ILogger<CityRepository> _log;

        private CityRepository() { }

        public CityRepository(MyPlacesDbContext db, ILogger<CityRepository> logger)
        {
            _db = db;
            _log = logger;
        }

        public async Task<City> Add(City entity, CancellationToken cancellationToken)
        {
            if (entity == null)
            {
                throw new Exception("City entity to add was null");
            }

            _db.Add(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);

                _log.LogInformation($"City with Id={entity.Id} has been added to the database");

                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding a City to the database", ex);
            }
        }

        public async Task<City> Get(Guid id, CancellationToken cancellationToken)
        {
            if (id == Guid.Empty)
            {
                throw new Exception("Cannot get City with Id equal to an empty GUID");
            }

            var entity = await _db.FindAsync<City>(new[] { id.ToString() }, cancellationToken);

            if (entity == null)
            {
                _log.LogInformation($"A City with Id={id} was not found");
            }
            else
            {
                _log.LogInformation($"Got City with Id={id} from the database");
            }

            return entity;
        }

        public async Task<IEnumerable<City>> GetAll(CancellationToken cancellationToken)
        {
            var cities = await _db.Cities.ToListAsync(cancellationToken);

            _log.LogInformation($"Got {cities.Count} cities from the database");

            return cities;
        }

        public async Task<City> Update(City entity, CancellationToken cancellationToken)
        {
            if (entity == null)
            {
                throw new Exception("City entity to update was null");
            }

            _db.Cities.Update(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);

                _log.LogInformation($"City with Id={entity.Id} has been updated in the database");

                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating a City in the database", ex);
            }
        }

        public async Task Delete(Guid id, CancellationToken cancellationToken)
        {
            var entity = await Get(id, cancellationToken);

            _db.Cities.Remove(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting a City from the database", ex);
            }
        }

        public async Task Delete(City entity, CancellationToken cancellationToken)
        {
            if (entity == null)
            {
                throw new Exception("City entity to delete was null");
            }

            _db.Cities.Remove(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting a City from the database", ex);
            }
        }
    }
}
