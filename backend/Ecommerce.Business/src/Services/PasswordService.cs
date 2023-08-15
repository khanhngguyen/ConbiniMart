using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace Ecommerce.Business.src.Services
{
    public class PasswordService
    {
        public static void HashPassword(string original, out string hashed, out byte[] salt)
        {
            var hmac = new HMACSHA256();
            salt = hmac.Key;
            hashed = Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(original)));
        }

        public static bool VerifyPassword(string original, string hashed, byte[] salt)
        {
            var hmac = new HMACSHA256(salt);
            var hashedOriginal = Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(original)));
            return hashedOriginal == hashed;
        }
    }
}