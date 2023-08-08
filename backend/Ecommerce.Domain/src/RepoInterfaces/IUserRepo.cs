using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Domain.src.RepoInterfaces
{
    public interface IUserRepo : IBaseRepo<User>
    {
        IEnumerable<User> GetAll(QueryOptions queryOptions);
        User GetOneById(Guid id);
        bool DeleteOneById(Guid id);
    }
}