using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    [Authorize]
    [Route("api/v1/[controller]s")]
    public class UserController : CrudController<User, UserCreateDto, UserReadDto, UserUpdateDto>
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) : base(userService)
        {
            _userService = userService;
        }

        // [Authorize(Policy = "AdminOnly")]
        [AllowAnonymous]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 403)]
        [ProducesResponseType(statusCode: 40)]
        public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
        {
            if (queryOptions.PageNumber < 0 || queryOptions.PageSize < 0) return BadRequest("Page number & Page size must be positive integers");
            return Ok(await _userService.GetAll(queryOptions));
        }

        [AllowAnonymous]
        [ProducesResponseType(statusCode: 201)]
        public override async Task<ActionResult<UserReadDto>> CreateOne([FromBody] UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateOne), await _userService.CreateOne(dto));
        }

        // [Authorize(Policy = "AdminOnly")]
        [AllowAnonymous]
        [HttpPost("admin")]
        [ProducesResponseType(statusCode: 201)]
        public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
        }

        [Authorize(Policy = "AdminOnly")]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]
        public override async Task<ActionResult<UserReadDto>> GetOneById([FromRoute] Guid id)
        {
            if (await _userService.GetOneById(id) is null)
            {
                return NotFound();
            }
            return Ok(await _userService.GetOneById(id));
        }

        [HttpPatch("/update/{id:Guid}")]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]
        public async Task<ActionResult<UserReadDto>> UpdatePassword([FromRoute] Guid id, [FromBody] string newPassword)
        {
            if (await _userService.GetOneById(id) is null)
            {
                return NotFound();
            }
            return Ok(await _userService.UpdatePassword(id, newPassword));
        }

        [HttpGet("profile")]
        [ProducesResponseType(statusCode: 200)]
        public async Task<ActionResult<UserReadDto>> GetProfile()
        {
            var id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(await _userService.GetOneById(new Guid(id)));
        }

        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 401)]
        public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
        {
            var claimId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (claimId == id.ToString()) return Ok(await _userService.DeleteOneById(new Guid(claimId)));
            else return NotFound();
        }
    }
}