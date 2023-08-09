using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Domain.src.RepoInterfaces
{
    public interface IBaseRepo<T>
    {
        IEnumerable<T> GetAll(QueryOptions queryOptions);
        T CreateOne(T entity);
        T GetOneById(Guid id);
        T UpdateOne(T originalEntity, T updateEntity);
        bool DeleteOne(T entity);
    }
}