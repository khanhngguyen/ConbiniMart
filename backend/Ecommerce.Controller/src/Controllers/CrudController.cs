using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controller.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class CrudController<T, TCreateDto, TReadDto, TUpdateDto> : ControllerBase
    {
        private readonly IBaseService<T, TCreateDto, TReadDto, TUpdateDto> _baseService;

        public CrudController(IBaseService<T, TCreateDto, TReadDto, TUpdateDto> baseService)
        {
            _baseService = baseService;
        }
        
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
        {
            if (queryOptions.PageNumber < 0 || queryOptions.PageSize < 0) return BadRequest("Page number & Page size must be positive integers");
            return Ok(await _baseService.GetAll(queryOptions));
        }

        [HttpPost]
        public async Task<ActionResult<TReadDto>> CreateOne([FromBody] TCreateDto dto)
        {
            var created = await _baseService.CreateOne(dto);
            return CreatedAtAction("CreateOne", created);
        }

        [HttpGet("{id:Guid}")]
        public virtual async Task<ActionResult<TReadDto>> GetOneById([FromRoute] Guid id)
        {
            if (await _baseService.GetOneById(id) is null)
            {
                return NotFound();
            }
            return Ok(await _baseService.GetOneById(id));
        }

        [HttpPatch("{id:Guid}")]
        public async Task<ActionResult<TReadDto>> UpdateOneById([FromRoute] Guid id, TUpdateDto update)
        {
            return Ok(await _baseService.UpdateOneById(id, update));
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
        {
            // return StatusCode(204, _baseService.DeleteOneById(id));
            return Ok(await _baseService.DeleteOneById(id));
        }
    }
}