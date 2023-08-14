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
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<UserImage> UserImages { get; set; }

        static DatabaseContext()
        {
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }

        public DatabaseContext(IConfiguration config)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("DefaultConnection"));
            builder.MapEnum<Role>();
            builder.MapEnum<Category>();
            optionsBuilder.AddInterceptors(new TimeStampInterceptor());
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Role>();
            modelBuilder.HasPostgresEnum<Category>();

            // modelBuilder.Entity<Product>()
            // .HasMany(p => p.Image)
            // .WithOne(p => p.ProductId)
            // .HasForeignKey(p => p.ProductId)
            // .OnDelete(DeleteBehavior.Cascade);

            // modelBuilder.Entity<ProductImage>()
            // .HasOne(x => x.Id)
            // .WithMany(x => x.Product)
            // .HasForeignKey(x => x.ProductId)
            // .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderProduct>()
            .HasOne(orderProduct => orderProduct.Order)
            .WithMany(order => order.OrderProducts)
            .OnDelete(DeleteBehavior.SetNull);
        }
    }
}