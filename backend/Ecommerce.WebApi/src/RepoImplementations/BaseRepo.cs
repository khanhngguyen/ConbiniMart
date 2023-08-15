using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;
using Ecommerce.WebApi.src.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.WebApi.src.RepoImplementations
{
    public class BaseRepo<T> : IBaseRepo<T> where T : class
    {
        protected readonly DbSet<T> _dbSet;
        protected readonly DatabaseContext _context;

        public BaseRepo(DatabaseContext databaseContext)
        {
            _dbSet = databaseContext.Set<T>();
            _context = databaseContext;
        }

        public async Task<IEnumerable<T>> GetAll([FromQuery] QueryOptions queryOptions)
        {
            return await _dbSet.Skip(queryOptions.PageNumber * queryOptions.PageSize).Take(queryOptions.PageSize).ToListAsync();
        }
        public virtual async Task<T> CreateOne(T entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> GetOneById(Guid id)
        {
            // var found = await _dbSet.FindAsync(id);
            // if (found is null)
            // {
            //     Console.WriteLine("base Repo can not find");
            //     throw new Exception("Item not found");
            // }
            // else return found;
            return await _dbSet.FindAsync(id);
        }
        public T GetOneByIdSync(Guid id)
        {
            return _dbSet.Find(id);
        }
        public virtual async Task<T> UpdateOneById(Guid id, T updateEntity)
        {
            var found = await _dbSet.FindAsync(id);
            // if (found != null)
            // {
            //     _context.Entry(found).CurrentValues.SetValues(updateEntity);
            //     _context.SaveChanges();
            //     return found;
            // }
            if (found is null) throw new Exception("Item not found");
            else 
            {
                _context.Entry(found).CurrentValues.SetValues(updateEntity);
                await _context.SaveChangesAsync();
                return found;
            // _context.Entry(found).State = EntityState.Detached;
            //     _context.Entry(found).State = EntityState.Modified;
            //     _context.Update<T>(updateEntity);
            //     _context.Entry(found).CurrentValues.SetValues(updateEntity);
            //     _context.Attach(found);
            //     _context.SaveChanges();
            //     return found;
            }
            //     _context.SaveChanges();
            //     return found;
        }
        public async Task<bool> DeleteOneById(Guid id)
        {
            var found =  await _dbSet.FindAsync(id);
            if (found != null)
            {
                _dbSet.Attach(found);
                _dbSet.Remove(found);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}