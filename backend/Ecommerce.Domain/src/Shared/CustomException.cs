using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Shared
{
    public class CustomException : Exception
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public CustomException(string message, int statusCode = 500)
        {
            StatusCode = statusCode;
            Message = message;
        }

        public static CustomException NotFoundException(string message = "Item can not be found")
        {
            return new CustomException(message, 404);
        }
    }
}