using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.Dtos
{
    public class OrderReadDto
    {
        public OrderStatus OrderStatus { get; set; }
        // public List<OrderProduct> OrderProducts { get; set; }
        public List<OrderProductReadDto> OrderProducts { get; set; }
    }

    public class OrderCreateDto
    {
        public List<OrderProductCreateDto> OrderProducts { get; set; }
    }

    public class OrderUpdateDto
    {
        public List<OrderProduct> OrderProducts { get; set; }
    }
}