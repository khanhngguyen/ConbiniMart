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
    public class OrderRepo : BaseRepo<Order>, IOrderRepo
    {
        public OrderRepo(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public override async Task<Order> CreateOne(Order order)
        {
            _dbSet.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }
        public async Task<IEnumerable<Order>> GetAllByUserId(Guid userId)
        {
            var result = await _dbSet
                .Include(x => x.OrderProducts)
                .ThenInclude(x => x.Product)
                .Where(x => x.User.Id == userId)
                .ToListAsync();
            return result;
        }
        public override async Task<Order> GetOneById(Guid id)
        {
            // return await _dbSet.FindAsync(id);
            // return result;
            return await _dbSet
                .Include(x => x.OrderProducts)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}