using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class Product : BaseEntity
    {
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float Price { get; set; }
        public Category Category { get; set; }
        public int Inventory { get; set; }
        public ProductImage Image { get; set; } = default!;
    }

    public enum Category
    {
        Vegetables,
        Meat,
        Dairy,
        Others
    }
}