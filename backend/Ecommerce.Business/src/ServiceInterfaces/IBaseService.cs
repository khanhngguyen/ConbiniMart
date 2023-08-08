using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.ServiceInterfaces
{
    public interface IBaseService<T, TDto>
    {
        IEnumerable<TDto> GetAll(QueryOptions queryOptions);
        TDto GetOneById(Guid id);
        TDto UpdateOneById(Guid id, TDto updated);
        bool DeleteOneById(Guid id);
    }
}