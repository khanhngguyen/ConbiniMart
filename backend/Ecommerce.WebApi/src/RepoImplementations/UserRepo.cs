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
    public class UserRepo : BaseRepo<User>, IUserRepo
    {
        public UserRepo(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public override async Task<User> CreateOne(User user)
        {
            user.Role = Role.User;
            _dbSet.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> CreateAdmin(User user)
        {
            user.Role = Role.Admin;
            _dbSet.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<bool> CheckEmail(string email)
        {
            var found = await _dbSet.FirstOrDefaultAsync(x => x.Email == email);
            if (found != null) return true;
            else return false;
        }
        public override async Task<User> UpdateOneById(Guid id, User updateUser)
        {
            var found = await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
            if (found is null) throw new Exception("User not found");
            else
            {
                found.FirstName = updateUser.FirstName;
                found.Lastname = updateUser.Lastname;
                await _context.SaveChangesAsync();
                return found;
            }
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}