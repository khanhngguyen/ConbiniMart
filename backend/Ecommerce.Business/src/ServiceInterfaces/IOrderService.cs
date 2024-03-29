using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Business.src.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<OrderReadDto> PlaceOrder(Guid userId, OrderCreateDto dto);
        Task<IEnumerable<OrderReadDto>> GetAllByUserId(Guid userId);
        Task<OrderReadDto> GetOneById(Guid id);
    }
}