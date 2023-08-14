using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.ServiceInterfaces
{
    public interface IBaseService<T, TCreateDto, TReadDto, TUpdateDto>
    {
        Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);
        Task<TReadDto> CreateOne(TCreateDto entity);
        Task<TReadDto> GetOneById(Guid id);
        Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated);
        Task <bool> DeleteOneById(Guid id);
    }
}