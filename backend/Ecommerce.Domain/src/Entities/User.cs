using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public UserImage Avatar { get; set; }
        public string Password { get; set; }
        public byte[] Salt { get; set; }
        public Role Role { get; set; }
    }

    // [JsonConverter(typeof(StringEnumConverter))]
    public enum Role
    {
        Admin,
        User
    }
}