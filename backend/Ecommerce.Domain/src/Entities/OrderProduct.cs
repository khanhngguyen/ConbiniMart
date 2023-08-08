using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class OrderProduct : BaseEntity
    {
        public Product Product { get; set; }
        public Order Order { get; set; }
        public int Amount { get; set; }
    }
}