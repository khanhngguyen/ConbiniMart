using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.Business.src.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepo _userRepo;

        public AuthService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<string> VerifyCredentials(UserCredentialsDto credentials)
        {
            var found = await _userRepo.FindByEmail(credentials.Email) ?? throw CustomException.NotFoundException("Email not found");
            var isAuthenticated = PasswordService.VerifyPassword(credentials.Password, found.Password, found.Salt);
            if (!isAuthenticated) throw new AuthenticationException("Password incorrect");
            return GenerateToken(found);
        }
        private string GenerateToken(User user)
        {
            var claims = new List<Claim>() {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ecommerce-backend-authservice-security-key"));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var securityTokenDescriptor = new SecurityTokenDescriptor{
                Issuer = "ecommerce-backend",
                Expires = DateTime.Now.AddMinutes(20),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = signingCredentials
            };

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            return jwtSecurityTokenHandler.WriteToken(token);
        }
    }
}