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
    public class OrderService : IOrderService
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IOrderProductRepo _orderProductRepo;
        private readonly IUserRepo _userRepo;
        private readonly IProductRepo _productRepo;
        private readonly IOrderProductService _orderProductService;
        private readonly IMapper _mapper;
        
        public OrderService(
            IOrderRepo orderRepo, 
            IOrderProductRepo orderProductRepo, 
            IUserRepo userRepo, 
            IProductRepo productRepo,
            IOrderProductService orderProductService,
            IMapper mapper)
        {
            _orderRepo = orderRepo;
            _orderProductRepo = orderProductRepo;
            _userRepo = userRepo;
            _productRepo = productRepo;
            _orderProductService = orderProductService;
            _mapper = mapper;
        }

        public async Task<OrderReadDto> PlaceOrder(Guid id, OrderCreateDto dto)
        {
            var user = await _userRepo.GetOneById(id) ?? throw new Exception("User not found");
            var order = _mapper.Map<Order>(dto);
            order.User = user;

            var createdOrder = await _orderRepo.CreateOne(order);

            //find products from dto's ProductId (type OrderProductCreatedto)

            //map OrderProductCreateDto to OrderProduct
            var orderProducts = _mapper.Map<List<OrderProduct>>(dto.OrderProducts);
            // foreach (var item in orderProducts)
            // {
            //     item.Order = createdOrder;
            //     item.OrderId = createdOrder.Id;
            // }
            // map each props inside OrderProduct from OrderProducfCreateDto (productId --> product)
            // map OrderProductCreateDto.productId => OrderProduct.Product
            for (int i = 0; i < orderProducts.Count; i++)
            {
                orderProducts[i].Order = createdOrder;
                orderProducts[i].OrderId = createdOrder.Id;
                orderProducts[i].Product = _productRepo.GetOneByIdSync(dto.OrderProducts[i].ProductId);

                await _orderProductRepo.CreateOrderProduct(orderProducts[i]);
            }

            createdOrder.OrderProducts = orderProducts;

            // var createdOrderProducts = await _orderProductService.CreateOrderProduct(orderProducts.ToArray());
            // createdOrder.OrderProducts = createdOrderProducts.ToList();

            return _mapper.Map<OrderReadDto>(createdOrder);
        }

        public Task<OrderReadDto> UpdateOneById(Guid id, OrderUpdateDto updated)
        {
            throw new NotImplementedException();
        }
    }
}