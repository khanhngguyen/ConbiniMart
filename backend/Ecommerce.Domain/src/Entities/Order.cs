using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class Order : BaseEntity
    {
        public OrderStatus OrderStatus { get; set; }
        public User User { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
    }

    public enum OrderStatus
    {
        Pending,
        Shipped
    }
}