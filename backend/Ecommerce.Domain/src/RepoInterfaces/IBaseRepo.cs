using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Domain.src.RepoInterfaces
{
    public interface IBaseRepo<T>
    {
        Task<IEnumerable<T>> GetAll(QueryOptions queryOptions);
        Task<T> CreateOne(T entity);
        Task<T> GetOneById(Guid id);
        T GetOneByIdSync(Guid id);
        Task<T> UpdateOneById(Guid id, T updateEntity);
        Task<bool> DeleteOneById(Guid id);
    }
}