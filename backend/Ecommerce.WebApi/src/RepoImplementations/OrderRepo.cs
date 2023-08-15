using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.WebApi.src.Database;

namespace Ecommerce.WebApi.src.RepoImplementations
{
    public class OrderRepo : BaseRepo<Order>, IOrderRepo
    {
        public OrderRepo(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}