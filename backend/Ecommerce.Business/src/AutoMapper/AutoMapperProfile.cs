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

            CreateMap<ProductImage, ProductImageCreateDto>().ReverseMap();
            CreateMap<ProductImage, ProductImageReadDto>().ReverseMap();
            CreateMap<ProductImageCreateDto, ProductImageReadDto>().ReverseMap();

            CreateMap<UserImage, UserImageCreateDto>().ReverseMap();
            CreateMap<UserImage, UserImageReadDto>().ReverseMap();

            CreateMap<User, UserCreateDto>().ReverseMap();
            CreateMap<User, UserReadDto>().ReverseMap();
            CreateMap<User, UserUpdateDto>().ReverseMap();

            CreateMap<OrderProduct, OrderProductReadDto>().ReverseMap();
            CreateMap<OrderProduct, OrderProductCreateDto>().ReverseMap();
            CreateMap<OrderProduct, OrderProductUpdateDto>().ReverseMap();

            CreateMap<Order, OrderReadDto>().ReverseMap();
            CreateMap<Order, OrderCreateDto>().ReverseMap();
            CreateMap<Order, OrderUpdateDto>().ReverseMap();
        }
    }
}