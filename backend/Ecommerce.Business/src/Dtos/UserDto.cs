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
        public string FirstName { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public UserImageReadDto Avatar { get; set; }
        public Role Role { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }

    public class UserCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public UserImageCreateDto Avatar { get; set; }
        public string Password { get; set; }

    }

    public class UserUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class UserCredentialsDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}