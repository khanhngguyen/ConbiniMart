using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.WebApi.src.Database;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.WebApi.src.RepoImplementations
{
    public class OrderProductRepo : IOrderProductRepo
    {
        private readonly DbSet<OrderProduct> _dbSet;
        private readonly DatabaseContext _context;

        public OrderProductRepo(DatabaseContext databaseContext)
        {
            _context = databaseContext;
            _dbSet = _context.OrderProducts;
        }

        public async Task<IEnumerable<OrderProduct>> CreateOrderProduct(params OrderProduct[] orderProducts)
        {
            await _dbSet.AddRangeAsync(orderProducts);
            await _context.SaveChangesAsync();
            return orderProducts;
        }
    }
}