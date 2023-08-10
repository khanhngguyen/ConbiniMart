using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controller.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class ProductController : CrudController<Product, ProductCreateDto, ProductReadDto, ProductUpdateDto>
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService) : base(productService)
        {
            _productService = productService;
        }

        [HttpGet]        
        public override ActionResult<IEnumerable<ProductReadDto>> GetAll([FromQuery]QueryOptions queryOptions)
        {
            return Ok(base.GetAll(queryOptions));
        }

        [HttpPost]
        public override ActionResult<Product> CreateOne([FromBody] ProductCreateDto dto)
        {
            return Ok(base.CreateOne(dto));
        }
    }
}