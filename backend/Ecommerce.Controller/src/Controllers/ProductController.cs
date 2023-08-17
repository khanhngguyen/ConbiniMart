using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.Shared;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Policy = "AdminOnly")]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 403)]
        public override async Task<ActionResult<ProductReadDto>> CreateOne([FromBody] ProductCreateDto dto)
        {
            var created = await _productService.CreateOne(dto);
            return CreatedAtAction("CreateOne", created);
        }

        [Authorize(Policy = "AdminOnly")]
        [ProducesResponseType(statusCode: 200)]
        public override async Task<ActionResult<ProductReadDto>> UpdateOneById([FromRoute] Guid id, ProductUpdateDto update)
        {
            return Ok(await _productService.UpdateOneById(id, update));
        }

        [Authorize(Policy = "AdminOnly")]
        [ProducesResponseType(statusCode: 200)]
        public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
        {
            return Ok(await _productService.DeleteOneById(id));
        }
    }
}