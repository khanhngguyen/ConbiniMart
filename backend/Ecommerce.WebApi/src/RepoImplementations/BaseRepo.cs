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

        public IEnumerable<T> GetAll([FromQuery] QueryOptions queryOptions)
        {
            return _dbSet.Skip(queryOptions.PageNumber * queryOptions.PageSize).Take(queryOptions.PageSize);
        }
        public T CreateOne(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
            return entity;
        }
        public T GetOneById(Guid id)
        {
            return _dbSet.Find(id);
        }
        public virtual T UpdateOneById(Guid id, T updateEntity)
        {
            var found = _dbSet.Find(id);
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
                _context.SaveChanges();
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
        public bool DeleteOneById(Guid id)
        {
            var found = _dbSet.Find(id);
            if (found != null)
            {
                _dbSet.Remove(found);
                return true;
            }
            _context.SaveChanges();
            return false;
        }
    }
}