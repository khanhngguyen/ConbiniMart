using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controller.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 400)]
        [ProducesResponseType(statusCode: 401)]
        public async Task<ActionResult<OrderReadDto>> PlaceOrder([FromBody] OrderCreateDto dto)
        {
            if (dto.OrderProducts.Any(o => o.Amount <= 0)) return BadRequest("Amount can not be less than 0");
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var orderRead = await _orderService.PlaceOrder(new Guid(userId), dto);
            return CreatedAtAction(nameof(PlaceOrder), orderRead);
        }

        [Authorize]
        [HttpGet("all")]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 401)]
        public async Task<ActionResult<IEnumerable<OrderReadDto>>> GetAllByUserId()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var orders = await _orderService.GetAllByUserId(new Guid(userId));
            return Ok(orders);
        }

        [Authorize]
        [HttpGet("{id:Guid}")]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 401)]
        [ProducesResponseType(statusCode: 404)]
        public async Task<ActionResult<Order>> GetOneById([FromRoute] Guid id)
        {
            if (await _orderService.GetOneById(id) is null) return NotFound();
            return Ok(await _orderService.GetOneById(id));
        }
    }
}