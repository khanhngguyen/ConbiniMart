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
    [Authorize]
    [Route("api/v1/[controller]s")]
    public class UserController : CrudController<User, UserCreateDto, UserReadDto, UserUpdateDto>
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) : base(userService)
        {
            _userService = userService;
        }

        [HttpPost("admin")]
        public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
        }

        [AllowAnonymous]
        public override async Task<ActionResult<UserReadDto>> GetOneById([FromRoute] Guid id)
        {
            if (await _userService.GetOneById(id) is null)
            {
                return NotFound();
            }
            return Ok(await _userService.GetOneById(id));
        }

        [HttpPatch("{id:Guid}/update")]
        public async Task<ActionResult<UserReadDto>> UpdatePassword([FromRoute] Guid id, [FromBody] string newPassword)
        {
            if (await _userService.GetOneById(id) is null)
            {
                return NotFound();
            }
            return Ok(await _userService.UpdatePassword(id, newPassword));
        }

        // [HttpGet("profile")]
        // public async Task<ActionResult<UserReadDto>> GetProfile()
        // {
        //     var id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //     return Ok(await _userService.GetOneById(new Guid(id)));
        // }
    }
}