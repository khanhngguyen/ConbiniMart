using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.Services
{
    public class ProductService : BaseService<Product, ProductDto>, IProductService
    {
        private readonly IProductRepo _productRepo;

        public ProductService(IProductRepo productRepo, IMapper mapper) : base(productRepo, mapper)
        {
            _productRepo = productRepo;
            _mapper = mapper;
        }

        public IEnumerable<ProductDto> GetAll(QueryOptions queryOptions)
        {
            return _mapper.Map<IEnumerable<ProductDto>>(_productRepo.GetAll(queryOptions));
        }
        public ProductDto CreateOne(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            var createdProduct = _productRepo.CreateOne(product);
            return _mapper.Map<ProductDto>(createdProduct);
        }
        public ProductDto GetOneById(Guid id)
        {
            var found = _productRepo.GetOneById(id);
            return _mapper.Map<ProductDto>(found);
        }
        public ProductDto UpdateOneById(Guid id, ProductDto updateProduct)
        {
            throw new NotImplementedException();
        }
        bool DeleteOneById(Guid id)
        {
            var found = _productRepo.GetOneById(id);
            if (found != null)
            {
                return _productRepo.DeleteOneById(found.Id);
            }
            return false;
        }
    }
}