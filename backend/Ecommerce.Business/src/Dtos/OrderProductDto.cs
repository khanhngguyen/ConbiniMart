using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.Dtos
{
    public class OrderProductReadDto
    {
        public ProductReadDto Product { get; set; }
        // public OrderReadDto Order { get; set; }
        // public Guid OrderId { get; set; }
        public int Amount { get; set; }
    }

    public class OrderProductCreateDto
    {
        // public Product Product { get; set; }
        // public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }

    public class OrderProductUpdateDto
    {
        public int Amount { get; set; }
    }
}