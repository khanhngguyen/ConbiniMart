using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.ServiceInterfaces
{
    public interface IProductService : IBaseService<Product, ProductDto>
    {
        IEnumerable<ProductDto> GetAll(QueryOptions queryOptions);
        ProductDto CreateOne(ProductDto product);
        ProductDto GetOneById(Guid id);
        ProductDto UpdateOneById(Guid id, ProductDto updateProduct);
        bool DeleteOneById(Guid id);
    }
}