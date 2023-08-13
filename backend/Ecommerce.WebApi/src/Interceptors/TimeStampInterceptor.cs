using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Ecommerce.WebApi.src.Interceptors
{
    public class TimeStampInterceptor : SaveChangesInterceptor
    {
        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            var addedEntries = eventData.Context.ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added);

            foreach (var entry in addedEntries)
            {
                if (entry.Entity is TimeStamp hasTimeStamp)
                {
                    hasTimeStamp.CreatedAt = DateTimeOffset.UtcNow;
                    hasTimeStamp.UpdatedAt = DateTimeOffset.UtcNow;
                }
            }

            var modifiedEntries = eventData.Context.ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified);

            foreach (var entry in modifiedEntries)
            if (entry.Entity is TimeStamp hasTimeStamp)
            {
                hasTimeStamp.UpdatedAt = DateTimeOffset.UtcNow;
            }

            return base.SavingChanges(eventData, result);
        }
    }
}