using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;

namespace Ecommerce.Business.src.ServiceInterfaces
{
    public interface IAuthService
    {
        Task<string> VerifyCredentials(UserCredentialsDto credentials);
    }
}