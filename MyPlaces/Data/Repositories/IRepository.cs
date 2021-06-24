using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MyPlaces.Data.Repositories
{
    public interface IRepository<TEntity>
        where TEntity : class
    {
        Task<TEntity> Add(TEntity entity, CancellationToken cancellationToken = default);
        Task<TEntity> Get(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<TEntity>> GetAll(CancellationToken cancellationToken = default);
        Task<TEntity> Update(TEntity entity, CancellationToken cancellationToken = default);
        Task Delete(Guid id, CancellationToken cancellationToken = default);
        Task Delete(TEntity entity, CancellationToken cancellationToken = default);
    }
}
