using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Ecommerce.Controller.src.Policy
{
    public class OwnerOnly : AuthorizationHandler<OwnerOnlyRequirement, string>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context, 
            OwnerOnlyRequirement requirement,
            string resource
        )
        {
            var user = context.User;
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            Console.WriteLine($"user id: {userId}, resource: {resource}");

            if (userId == resource) 
            {
                context.Succeed(requirement);
            }
            
            return Task.CompletedTask;
        }
    }

    public class OwnerOnlyRequirement : IAuthorizationRequirement { }
}