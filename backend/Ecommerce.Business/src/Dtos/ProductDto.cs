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
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float Price { get; set; }
        public Category Category { get; set; }
        public int Inventory { get; set; }
        public ProductImageReadDto Image { get; set; } = default!;
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
    
    public class ProductCreateDto
    {
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float Price { get; set; }
        public Category Category { get; set; }
        public int Inventory { get; set; }
        public ProductImageCreateDto Image { get; set; } = default!;
    }

    public class ProductUpdateDto
    {
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float Price { get; set; }
        public Category Category { get; set; }
        public int Inventory { get; set; }
        public ProductImageCreateDto Image { get; set; } = default!;
    }
}