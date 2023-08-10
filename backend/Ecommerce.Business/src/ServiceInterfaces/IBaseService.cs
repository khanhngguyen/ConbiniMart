using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.ServiceInterfaces
{
    public interface IBaseService<T, TCreateDto, TReadDto, TUpdateDto>
    {
        IEnumerable<TReadDto> GetAll(QueryOptions queryOptions);
        T CreateOne(TCreateDto entity);
        TReadDto GetOneById(Guid id);
        TReadDto UpdateOneById(Guid id, TUpdateDto updated);
        bool DeleteOneById(Guid id);
    }
}