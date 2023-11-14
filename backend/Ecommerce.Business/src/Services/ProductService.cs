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

        public override async Task<ProductReadDto> UpdateOneById(Guid id, ProductUpdateDto updateProduct)
        {
            var found = await _productRepo.GetOneById(id);
            Console.WriteLine("reach product service");
            Console.WriteLine(found.Title);
            Console.WriteLine(found.Price);
            Console.WriteLine(found.Inventory);
            Console.WriteLine(found.Category);
            
            // Console.WriteLine(found.Image.Link);
            Console.WriteLine(updateProduct.Title);
            Console.WriteLine(updateProduct.Image.Link);
            Console.WriteLine(updateProduct.Inventory);
            Console.WriteLine(updateProduct.Category);
            if (found is null)
            {
                _productRepo.DeleteOneById(id);
                throw new Exception("Product not found");
            }
            if (updateProduct.Title == null || updateProduct.Title == "" || updateProduct.Title  == "string") updateProduct.Title = found.Title;
            if (updateProduct.Description == null || updateProduct.Description == "" || updateProduct.Description  == "string") updateProduct.Description = found.Description;
            if (updateProduct.Price == 0 || updateProduct.Price < 0) updateProduct.Price = found.Price;
            // if (updateProduct.Category.ToString() == "") updateProduct.Category = found.Category;
            if (updateProduct.Inventory == 0 || updateProduct.Inventory < 0) updateProduct.Inventory = found.Inventory;
            if (updateProduct.Image.Link == null || updateProduct.Image.Link == "" || updateProduct.Image.Link == "string") updateProduct.Image.Link = found.Image.Link;
            var update = await _productRepo.UpdateOneById(id, _mapper.Map<Product>(updateProduct));
            return _mapper.Map<ProductReadDto>(update);
        }
    }
}