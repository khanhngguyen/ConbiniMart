using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
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
            IQueryable<Product> results = _dbSet.Include(x => x.Image);
            //search
            if (!string.IsNullOrWhiteSpace(queryOptions.Search))
            {
                results = _dbSet.Where(p => p.Title.ToLower().Contains(queryOptions.Search.ToLower()));
            }
            //category
            switch (queryOptions.Category)
            { 
                case "Vegetables":
                    results = _dbSet.Where(p => p.Category == Category.Vegetables);
                    break;
                case "Meat":
                    results = _dbSet.Where(p => p.Category == Category.Meat);
                    break;
                case "Dairy":
                    results = _dbSet.Where(p => p.Category == Category.Dairy);
                    break;
                case "Others":
                    results = _dbSet.Where(p => p.Category == Category.Others);
                    break;
            }
            //order by
            if (queryOptions.OrderBy == "Newest first")
            {
                results = results.OrderBy(p => p.UpdatedAt);
            }
            else if (queryOptions.OrderBy == "Oldest first")
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

            //default query
            results = results.Skip(queryOptions.PageNumber * queryOptions.PageSize).Take(queryOptions.PageSize).Include(x => x.Image);
            return await results.ToListAsync();
        }

        public override async Task<Product> GetOneById(Guid id) {
            return await _dbSet
                .Include(x => x.Image)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<Product> UpdateOneById(Guid id, Product updateProduct)
        {
            var found = await _dbSet.FirstOrDefaultAsync(p => p.Id == id);
            Console.WriteLine("reach product database");
            if (found is null) throw new Exception("Product not found");
            else 
            {
                found.Title = updateProduct.Title;
                found.Description = updateProduct.Description;
                found.Price = updateProduct.Price;
                found.Category = updateProduct.Category;
                found.Inventory = updateProduct.Inventory;
                found.Image = updateProduct.Image;
                await _context.SaveChangesAsync();
                return found;
            }

            // _dbSet.Update(updateProduct);
            // await _context.SaveChangesAsync();
            // return updateProduct;
        }
    }
}