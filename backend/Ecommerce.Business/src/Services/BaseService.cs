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
        protected readonly IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper)
        {
            _baseRepo = baseRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions)
        {
            return  _mapper.Map<IEnumerable<TReadDto>>(await _baseRepo.GetAll(queryOptions)).ToList();
        }
        public virtual async Task<TReadDto> CreateOne(TCreateDto dto)
        {
            var entity = await _baseRepo.CreateOne(_mapper.Map<T>(dto));
            return _mapper.Map<TReadDto>(entity);
        }
        public async Task<TReadDto> GetOneById(Guid id)
        {
            return _mapper.Map<TReadDto>(await _baseRepo.GetOneById(id));
        }
        public virtual async Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated)
        {
            var found = await _baseRepo.GetOneById(id);
            if (found is null)
            {
                _baseRepo.DeleteOneById(id);
                throw new Exception("Item not found");
            }
            var updatedEntity = await _baseRepo.UpdateOneById(id, _mapper.Map<T>(updated));
            return _mapper.Map<TReadDto>(updatedEntity);
        }
        public async Task<bool> DeleteOneById(Guid id)
        {
            // var found = _baseRepo.GetOneByIdSync(id);
            var found = await _baseRepo.GetOneById(id);
            if (found != null)
            {
                await _baseRepo.DeleteOneById(id);
                return true;
            }
            return false;
        }
    }
}