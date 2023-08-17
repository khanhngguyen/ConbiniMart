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
    public class OrderProductService : IOrderProductService
    {
        private readonly IOrderProductRepo _orderProductRepo;
        private readonly IMapper _mapper;

        public OrderProductService(IOrderProductRepo orderProductRepo, IMapper mapper)
        {
            _orderProductRepo = orderProductRepo;
            _mapper = mapper;
        }

        public async Task<OrderProductReadDto> CreateOrderProduct(OrderProduct orderProduct)
        {
            var created = await _orderProductRepo.CreateOrderProduct(orderProduct);
            return _mapper.Map<OrderProductReadDto>(created);
        }
    }
}