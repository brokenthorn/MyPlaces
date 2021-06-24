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
    public class GMPlaceRepository : IRepository<GMPlace>
    {
        private MyPlacesDbContext _db;
        private ILogger<GMPlaceRepository> _log;

        private GMPlaceRepository() { }

        public GMPlaceRepository(MyPlacesDbContext db, ILogger<GMPlaceRepository> logger)
        {
            _db = db;
            _log = logger;
        }

        public async Task<GMPlace> Add(GMPlace entity, CancellationToken cancellationToken)
        {
            if (entity == null)
            {
                throw new Exception("GMPlace entity to add was null");
            }

            _db.Add(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);

                _log.LogInformation($"GMPlace with Id={entity.Id} has been added to the database");

                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding a GMPlace to the database", ex);
            }
        }

        public async Task<GMPlace> Get(Guid id, CancellationToken cancellationToken)
        {
            if (id == Guid.Empty)
            {
                throw new Exception("Cannot get GMPlace with Id equal to an empty GUID");
            }

            var entity = await _db.FindAsync<GMPlace>(new[] { id.ToString() }, cancellationToken);

            if (entity == null)
            {
                _log.LogInformation($"A GMPlace with Id={id} was not found");
            }
            else
            {
                _log.LogInformation($"Got GMPlace with Id={id} from the database");
            }

            return entity;
        }

        public async Task<IEnumerable<GMPlace>> GetAll(CancellationToken cancellationToken)
        {
            var gmPlaces = await _db.GMPlaces.ToListAsync(cancellationToken);

            _log.LogInformation($"Got {gmPlaces.Count} gmPlaces from the database");

            return gmPlaces;
        }

        public async Task<GMPlace> Update(GMPlace entity, CancellationToken cancellationToken)
        {
            if (entity == null)
            {
                throw new Exception("GMPlace entity to update was null");
            }

            _db.GMPlaces.Update(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);

                _log.LogInformation($"GMPlace with Id={entity.Id} has been updated in the database");

                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating a GMPlace in the database", ex);
            }
        }

        public async Task Delete(Guid id, CancellationToken cancellationToken)
        {
            var entity = await Get(id, cancellationToken);

            _db.GMPlaces.Remove(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting a GMPlace from the database", ex);
            }
        }

        public async Task Delete(GMPlace entity, CancellationToken cancellationToken)
        {
            if (entity == null)
            {
                throw new Exception("GMPlace entity to delete was null");
            }

            _db.GMPlaces.Remove(entity);

            try
            {
                await _db.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting a GMPlace from the database", ex);
            }
        }
    }
}
