using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.Dtos
{
    [AutoMap(typeof(Product))]
    public class ProductReadDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Category Category { get; set; }
        public List<Image> Images { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
    
    // [AutoMap(typeof(Product))]
    public class ProductCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Category Category { get; set; }
        public int Inventory { get; set; }
        public List<ImageCreateDto> Images { get; set; }
    }

    [AutoMap(typeof(Product))]
    public class ProductUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Inventory { get; set; }
        public List<Image> Images { get; set; }
    }
}