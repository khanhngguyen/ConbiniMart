using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class Image : BaseEntity
    {
        public string Link { get; set; } = string.Empty;
    }

    public class ProductImage : Image
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; } = default!;
    }

    public class UserImage : Image
    {
        public Guid UserId { get; set; }
        public User User { get; set; } = default!;
    }
}