using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.Services
{
    public class BaseService<T, TCreateDto, TReadDto, TUpdateDto> : IBaseService<T, TCreateDto, TReadDto, TUpdateDto>
    {
        private readonly IBaseRepo<T> _baseRepo;
        protected IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper)
        {
            _baseRepo = baseRepo;
            _mapper = mapper;
        }

        public IEnumerable<TReadDto> GetAll(QueryOptions queryOptions)
        {
            return _mapper.Map<IEnumerable<TReadDto>>(_baseRepo.GetAll(queryOptions));
        }
        public TReadDto CreateOne(TCreateDto dto)
        {
            var entity = _baseRepo.CreateOne(_mapper.Map<T>(dto));
            return _mapper.Map<TReadDto>(entity);
        }
        public TReadDto GetOneById(Guid id)
        {
            return _mapper.Map<TReadDto>(_baseRepo.GetOneById(id));
        }
        public TReadDto UpdateOneById(Guid id, TUpdateDto updated)
        {
            var found = _baseRepo.GetOneById(id);
            if (found is null)
            {
                _baseRepo.DeleteOne(found);
                throw new Exception("Item not found");
            }
            var updatedEntity = _baseRepo.UpdateOne(found, _mapper.Map<T>(updated));
            return _mapper.Map<TReadDto>(updatedEntity);
        }
        public bool DeleteOneById(Guid id)
        {
            var found = _baseRepo.GetOneById(id);
            if (found != null)
            {
                return _baseRepo.DeleteOne(found);
            }
            return false;
        }
    }
}