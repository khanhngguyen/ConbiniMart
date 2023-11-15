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

        public DatabaseContext(DbContextOptions options, IConfiguration config) : base(options)
        {
            _config = config;
        }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("DefaultConnection"));
        //     builder.MapEnum<Role>();
        //     builder.MapEnum<Category>();
        //     builder.MapEnum<OrderStatus>();
        //     optionsBuilder.AddInterceptors(new TimeStampInterceptor());
        //     optionsBuilder.EnableDetailedErrors();
        //     // optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        //     optionsBuilder.UseNpgsql(builder =>
        //     {
        //         builder.EnableRetryOnFailure(
        //             maxRetryCount: 10,
        //             maxRetryDelay: TimeSpan.FromSeconds(5),
        //             errorCodesToAdd: null
        //         );
            
        //     });
        //     optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        // }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Role>();
            modelBuilder.HasPostgresEnum<Category>();
            modelBuilder.HasPostgresEnum<OrderStatus>();

            modelBuilder.Entity<Product>()
            .HasOne(p => p.Image)
            .WithOne(x => x.Product)
            // .HasForeignKey<ProductImage>(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

            // modelBuilder.Entity<ProductImage>()
            // .HasOne(x => x.Product)
            // .WithOne(p => p.Image)
            // .HasForeignKey<ProductImage>(x => x.ProductId)
            // .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderProduct>()
            .HasOne(orderProduct => orderProduct.Order)
            .WithMany(order => order.OrderProducts)
            // .HasConstraintName("fk_orders_products_products_orders_order_id")
            // .HasConstraintName("fk_orders_products_products_product_id")
            .OnDelete(DeleteBehavior.SetNull);
        }
    }
}