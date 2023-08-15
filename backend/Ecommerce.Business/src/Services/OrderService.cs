using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;

namespace Ecommerce.Business.src.Services
{
    public class OrderService : BaseService<Order, OrderCreateDto, OrderReadDto, OrderReadDto>, IOrderService
    {
        private readonly IOrderRepo _orderRepo;
        
        public OrderService(IOrderRepo orderRepo, IMapper mapper) : base(orderRepo, mapper)
        {
            _orderRepo = orderRepo;
        }

        public Task<OrderReadDto> UpdateOneById(Guid id, OrderUpdateDto updated)
        {
            throw new NotImplementedException();
        }
    }
}