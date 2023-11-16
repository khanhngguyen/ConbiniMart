using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Business.src.Middleware
{
    public class ErrorHandlerMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try 
            {
                await next(context);
            }
            catch (CustomException e)
            {
                context.Response.StatusCode = e.StatusCode;
                await context.Response.WriteAsync(e.Message);
                Console.WriteLine("Custom Exception" + e);
            }
            catch (DbUpdateException e)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(e.InnerException!.Message);
                Console.WriteLine("Database Exception" + e);
            }
            catch (Exception e)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(e.Message);
                Console.WriteLine("HEHEHHEE");
                // Console.WriteLine(e.GetBaseException());
                Console.WriteLine("General Exception " + e.Data);
                Console.WriteLine("General Exception " + e.Message);
                Console.WriteLine(e);
            }
        }
    }
}