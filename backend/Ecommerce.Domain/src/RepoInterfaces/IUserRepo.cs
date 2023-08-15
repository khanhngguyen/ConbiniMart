using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Domain.src.RepoInterfaces
{
    public interface IUserRepo : IBaseRepo<User>
    {
        Task<User> CreateAdmin(User user);
        Task<bool> CheckEmail(string email);
        Task<User?> FindByEmail(string email);
        Task<User> UpdatePassword(User user);
    }
}