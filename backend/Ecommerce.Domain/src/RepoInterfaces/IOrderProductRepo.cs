using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Domain.src.RepoInterfaces
{
    public interface IOrderProductRepo 
    {
        Task<OrderProduct> CreateOrderProduct(OrderProduct orderProduct);
    }
}