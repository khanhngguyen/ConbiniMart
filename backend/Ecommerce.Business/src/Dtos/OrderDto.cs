using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.Dtos
{
    public class OrderReadDto
    {
        public Guid Id { get; set; }
        public OrderStatus OrderStatus { get; set; }
        // public List<OrderProduct> OrderProducts { get; set; }
        public List<OrderProductReadDto> OrderProducts { get; set; }  = default!;
    }

    public class OrderCreateDto
    {
        public List<OrderProductCreateDto> OrderProducts { get; set; }  = default!;
    }

    public class OrderUpdateDto
    {
        public List<OrderProduct> OrderProducts { get; set; }  = default!;
    }
}