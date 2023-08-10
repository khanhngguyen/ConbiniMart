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
        public Product Product { get; set; }
        public Order Order { get; set; }
        // [ForeignKey(nameof(ProductId))]
        // public Guid ProductId { get; set; }
        // [ForeignKey(nameof(OrderId))]
        public Guid OrderId { get; set; }
        public int Amount { get; set; }
    }
}