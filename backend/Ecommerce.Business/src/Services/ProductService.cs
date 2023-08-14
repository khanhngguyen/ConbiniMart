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
    public class ProductService : BaseService<Product, ProductCreateDto, ProductReadDto, ProductUpdateDto>, IProductService
    {
        private readonly IProductRepo _productRepo;

        public ProductService(IProductRepo productRepo, IMapper mapper) : base(productRepo, mapper)
        {
            _productRepo = productRepo;
            // _mapper = mapper;
        }

        // public IEnumerable<ProductReadDto> GetAll(QueryOptions queryOptions)
        // {
        //     return _mapper.Map<IEnumerable<ProductDto>>(_productRepo.GetAll(queryOptions));
        // }
        // public override ProductReadDto CreateOne(ProductCreateDto dto)
        // {
        //     var product = _mapper.Map<Product>(dto);
        //     // product.Id = Guid.NewGuid();
        //     var createdProduct = _productRepo.CreateOne(product);
        //     // var createdProduct = _productRepo.CreateOne(_mapper.Map<Product>(dto));
        //     return _mapper.Map<ProductReadDto>(createdProduct);
        // }
        // public ProductDto GetOneById(Guid id)
        // {
        //     var found = _productRepo.GetOneById(id);
        //     return _mapper.Map<ProductDto>(found);
        // }
        public override async Task<ProductReadDto> UpdateOneById(Guid id, ProductUpdateDto updateProduct)
        {
            var found = await _productRepo.GetOneById(id);
            if (found is null)
            {
                _productRepo.DeleteOneById(id);
                throw new Exception("Product not found");
            }
            if (updateProduct.Title == null || updateProduct.Title == "") updateProduct.Title = found.Title;
            if (updateProduct.Description == null || updateProduct.Description == "") updateProduct.Description = found.Description;
            if (updateProduct.Price == 0 || updateProduct.Price < 0) updateProduct.Price = found.Price;
            if (updateProduct.Category.ToString() == null || updateProduct.Category.ToString() == "") updateProduct.Category = found.Category;
            if (updateProduct.Inventory.ToString() == null || updateProduct.Inventory.ToString() == "") updateProduct.Inventory = found.Inventory;
            var update = await _productRepo.UpdateOneById(id, _mapper.Map<Product>(updateProduct));
            return _mapper.Map<ProductReadDto>(update);
        }
        // bool DeleteOneById(Guid id)
        // {
        //     var found = _productRepo.GetOneById(id);
        //     if (found != null)
        //     {
        //         return _productRepo.DeleteOneById(found.Id);
        //     }
        //     return false;
        // }
    }
}