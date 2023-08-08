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
    public class BaseService<T, TDto> : IBaseService<T, TDto> where T : class where TDto : class
    {
        private readonly IBaseRepo<T> _baseRepo;
        protected IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper)
        {
            _baseRepo = baseRepo;
            _mapper = mapper;
        }

        public IEnumerable<TDto> GetAll(QueryOptions queryOptions)
        {
            return _mapper.Map<IEnumerable<TDto>>(_baseRepo.GetAll(queryOptions));
        }
        public TDto CreateOne(TDto dto)
        {
            var entity = _baseRepo.CreateOne(_mapper.Map<T>(dto));
            return _mapper.Map<TDto>(entity);
        }
        public TDto GetOneById(Guid id)
        {
            throw new NotImplementedException();
        }
        public TDto UpdateOneById(Guid id, TDto updated)
        {
            throw new NotImplementedException();
        }
        public bool DeleteOneById(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}