using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductCreateDto>().ReverseMap();
            CreateMap<Product, ProductReadDto>().ReverseMap();
            CreateMap<Product, ProductUpdateDto>().ReverseMap();

            // CreateMap<Image, ImageCreateDto>().ReverseMap();
            // CreateMap<Image, ImageReadDto>().ReverseMap();

            CreateMap<ProductImage, ProductImageCreateDto>().ReverseMap();
            CreateMap<ProductImage, ProductImageReadDto>().ReverseMap();
            CreateMap<ProductImageCreateDto, ProductImageReadDto>().ReverseMap();
        }
    }
}