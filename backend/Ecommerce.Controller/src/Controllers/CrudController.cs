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
        public virtual ActionResult<IEnumerable<TReadDto>> GetAll([FromQuery] QueryOptions queryOptions)
        {
            return Ok(_baseService.GetAll(queryOptions));
        }

        [HttpPost]
        public ActionResult<TReadDto> CreateOne([FromBody] TCreateDto dto)
        {
            var created = _baseService.CreateOne(dto);
            return CreatedAtAction("CreateOne", created);
        }
    }
}