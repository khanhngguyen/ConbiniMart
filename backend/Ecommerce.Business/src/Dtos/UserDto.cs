using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.Dtos
{
    public class UserReadDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = default!;
        public string Lastname { get; set; } = default!;
        public string Email { get; set; } = default!;
        public UserImageReadDto Avatar { get; set; } = default!;
        public Role Role { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }

    public class UserCreateDto
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public UserImageCreateDto Avatar { get; set; } = default!;
        public string Password { get; set; } = default!;

    }

    public class UserUpdateDto
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
    }

    public class UserCredentialsDto
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }

    public class UpdatePasswordDto
    {
        public string Password { get; set; } = default!;
    }
}