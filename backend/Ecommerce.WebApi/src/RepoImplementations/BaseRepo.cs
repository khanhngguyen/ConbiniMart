using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;
using Ecommerce.WebApi.src.Database;
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

        public IEnumerable<T> GetAll(QueryOptions queryOptions)
        {
            throw new NotImplementedException();
        }
        public T CreateOne(T entity)
        {
            throw new NotImplementedException();
        }
        public T GetOneById(Guid id)
        {
            throw new NotImplementedException();
        }
        public T UpdateOne(T updateEntity)
        {
            throw new NotImplementedException();
        }
        public bool DeleteOneById(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}