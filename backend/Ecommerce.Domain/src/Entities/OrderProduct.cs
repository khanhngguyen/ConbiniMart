using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Domain.src.Entities
{
    // [PrimaryKey(nameof(ProductId), nameof(OrderId))]
    public class OrderProduct : BaseEntity
    {
        public Product Product { get; set; } = default!;
        public Order Order { get; set; } = default!;
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Amount { get; set; }
    }
}