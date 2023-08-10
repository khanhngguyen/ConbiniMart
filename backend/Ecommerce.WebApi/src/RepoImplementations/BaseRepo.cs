using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly DbSet<T> _dbSet;
        private readonly DatabaseContext _context;

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
            return entity;
        }
        public T GetOneById(Guid id)
        {
            return _dbSet.Find(id);
        }
        public T UpdateOne(T originalEntity, T updateEntity)
        {
            // throw new NotImplementedException();
            var found = _dbSet.Find(originalEntity);
            if (found != null)
            {
                _context.Entry(found).CurrentValues.SetValues(updateEntity);
            }
            return found;
        }
        public bool DeleteOne(T entity)
        {
            var found = _dbSet.Find(entity);
            if (found != null)
            {
                _dbSet.Remove(found);
                return true;
            }
            return false;
        }
    }
}