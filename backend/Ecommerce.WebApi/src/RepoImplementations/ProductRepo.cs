using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;
using Ecommerce.WebApi.src.Database;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.WebApi.src.RepoImplementations
{
    public class ProductRepo : BaseRepo<Product>, IProductRepo
    {
        public ProductRepo(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public override async Task<IEnumerable<Product>> GetAll(QueryOptions queryOptions)
        {
            IQueryable<Product> results = _dbSet;
            //search
            if (!string.IsNullOrWhiteSpace(queryOptions.Search))
            {
                results = _dbSet.Where(p => p.Title.ToLower().Contains(queryOptions.Search.ToLower()));
            }
            //order by
            if (queryOptions.OrderBy == "Newest first")
            {
                results = results.OrderBy(p => p.UpdatedAt);
            }
            else if (queryOptions.OrderBy == "Oldesr first")
            {
                results = results.OrderByDescending(p => p.CreatedAt);
            }
            else if (queryOptions.OrderBy == "Least expensive first")
            {
                results = results.OrderBy(p => p.Price);
            }
            else if (queryOptions.OrderBy == "Most expensive first")
            {
                results = results.OrderByDescending(p => p.Price);
            }
            //descending
            if (queryOptions.OrderByDescending) results.OrderByDescending(p => p.Title);

            //defeault query
            results = results.Skip(queryOptions.PageNumber * queryOptions.PageSize).Take(queryOptions.PageSize);
            return await results.ToListAsync();

        }

        public override async Task<Product> UpdateOneById(Guid id, Product updateProduct)
        {
            var found = await _dbSet.FirstOrDefaultAsync(p => p.Id == id);
            if (found is null) throw new Exception("Item not found");
            else 
            {
                found.Title = updateProduct.Title;
                found.Description = updateProduct.Description;
                found.Price = updateProduct.Price;
                found.Category = updateProduct.Category;
                found.Inventory = updateProduct.Inventory;
                await _context.SaveChangesAsync();
                return found;
            }
        }
    }
}