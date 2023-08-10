using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Ecommerce.WebApi.src.Interceptors;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Ecommerce.WebApi.src.Database
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _config;

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        public DatabaseContext(IConfiguration config)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("DefaultConnection"));
            optionsBuilder.AddInterceptors(new TimeStampInterceptor());
            // optionsBuilder.AddInterceptors(new IdInterceptor());
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>()
            .HasOne(orderProduct => orderProduct.Order)
            .WithMany(order => order.OrderProducts)
            .OnDelete(DeleteBehavior.SetNull);
        }
    }
}