using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Entities
{
    public class Product : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Category Category { get; set; }
        public int Inventory { get; set; }
        public ProductImage Image { get; set; }
    }

    public enum Category
    {
        Vegetables,
        Meat,
        Dairy,
        Others
    }
}