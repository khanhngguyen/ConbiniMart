using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.Dtos
{
    public class ProductReadDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<Image> Images { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
    
    public class ProductCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Inventory { get; set; }
        public List<Image> Images { get; set; }
    }

    public class ProductUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Inventory { get; set; }
        public List<Image> Images { get; set; }
    }
}