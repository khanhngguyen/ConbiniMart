using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Domain.src.RepoInterfaces
{
    public interface IProductRepo : IBaseRepo<Product>
    {
        IEnumerable<Product> GetAll(QueryOptions queryOptions);
        Product CreateOne(Product product);
        Product GetOneById(Guid id);
        Product UpdateOne(Product updateProduct);
        bool DeleteOneById(Guid id);
    }
}