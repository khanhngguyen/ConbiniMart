using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class Order : BaseEntity
    {
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public User User { get; set; }  = default!;
        public List<OrderProduct> OrderProducts { get; set; }  = default!;
    }

    public enum OrderStatus
    {
        Pending,
        Shipped
    }
}