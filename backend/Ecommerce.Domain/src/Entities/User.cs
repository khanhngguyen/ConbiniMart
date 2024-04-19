using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; } = default!;
        public string Lastname { get; set; } = default!;
        public string Email { get; set; }  = default!;
        public UserImage Avatar { get; set; } = default!;
        public string Password { get; set; } = default!;
        public byte[] Salt { get; set; } = default!;
        public Role Role { get; set; }
    }

    // [JsonConverter(typeof(StringEnumConverter))]
    public enum Role
    {
        Admin,
        User
    }
}