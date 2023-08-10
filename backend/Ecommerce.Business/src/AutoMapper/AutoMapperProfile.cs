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
            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();

            CreateMap<Product, ProductReadDto>();
            CreateMap<Product, ProductUpdateDto>();
            CreateMap<ProductReadDto, ProductUpdateDto>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<Product, ProductCreateDto>();
        }
    }
}