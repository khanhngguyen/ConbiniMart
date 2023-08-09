using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.ServiceInterfaces
{
    public interface IProductService : IBaseService<Product, ProductCreateDto, ProductReadDto, ProductUpdateDto>
    {
        
    }
}