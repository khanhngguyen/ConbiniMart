using System.Security.Claims;
using System.Text;
using Ecommerce.Business.src.AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.Middleware;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Business.src.Services;
using Ecommerce.Controller.src.Policy;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.WebApi.src.Database;
using Ecommerce.WebApi.src.Interceptors;
using Ecommerce.WebApi.src.RepoImplementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

//add database into the application
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Console.WriteLine("connection string" + connectionString);
var npgsqlBuilder = new NpgsqlDataSourceBuilder(connectionString);
npgsqlBuilder.MapEnum<Role>();
npgsqlBuilder.MapEnum<Category>();
npgsqlBuilder.MapEnum<OrderStatus>();

builder.Services.AddDbContext<DatabaseContext>(options => 
{
    options.AddInterceptors(new TimeStampInterceptor());
    options.EnableDetailedErrors();
    options.UseNpgsql(builder => 
    {
        builder.EnableRetryOnFailure(
            maxRetryCount: 10,
            maxRetryDelay: TimeSpan.FromSeconds(5),
            errorCodesToAdd: null
        );
    });
    // options.UseNpgsql(modifiedConnectionString).UseSnakeCaseNamingConvention();
    options.UseNpgsql(connectionString).UseCamelCaseNamingConvention();
});

// builder.Services.AddDbContext<DatabaseContext>();

// Add services to the container.
builder.Services.AddControllers();

// Add services for auto dependency injection
// Repo
builder.Services.AddScoped<IProductRepo, ProductRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IOrderRepo, OrderRepo>();
builder.Services.AddScoped<IOrderProductRepo, OrderProductRepo>();

// Services
builder.Services.AddSingleton<ErrorHandlerMiddleware>();

builder.Services.AddScoped<IAuthorizationHandler, OwnerOnly>();
// builder.Services.AddScoped<ErrorHandlerMiddleware>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IOrderProductService, OrderProductService>();

// Add AutoMapper
builder.Services.AddAutoMapper(config => config.AddProfile(typeof(AutoMapperProfile)));
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Bearer token authentication",
        Name = "Authentication",
        In = ParameterLocation.Header
        // Type = SecuritySchemeType.Http,
        // Scheme = "Bearer"
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
    // options.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
    // options.IgnoreObsoleteActions();
    // options.IgnoreObsoleteProperties();
    // options.CustomSchemaIds(type => type.FullName);
});

//config route
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

//config authentication
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "ecommerce-backend",
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ecommerce-backend-authservice-security-key")),
            ValidateIssuerSigningKey = true
        };
        // options.Events = new JwtBearerEvents
        // {
        //     OnAuthenticationFailed = async (context) => {
        //         context.HttpContext.GetRouteData();
        //         context.HttpContext.Connection.ToString();
        //         await context.Response.CompleteAsync();
        //     },
        //     OnChallenge = async (context) => {
        //         context.HttpContext.GetRouteData();
        //         context.HttpContext.Connection.ToString();
        //         await context.Response.CompleteAsync();
        //     }
        // };
    });

//add authorization policy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim(ClaimTypes.Role, "Admin"));
    options.AddPolicy("OwnerOnly", policy => policy.AddRequirements(new OwnerOnlyRequirement()));
});

//add Cors
builder.Services.AddCors(options =>
{
    // options.AddPolicy("AllowOrigin", policy => policy.WithOrigins("https://localhost:3000").AllowAnyHeader().AllowAnyMethod());
    // options.AddDefaultPolicy(policy => policy.WithOrigins("https://localhost:3000").AllowAnyHeader().AllowAnyMethod());
    options.AddDefaultPolicy(
        builder => {
            builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
            builder.WithOrigins("https://conbinimart.netlify.app").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
    // app.UseSwaggerUI(c =>
    // {
    //     c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    //     c.RoutePrefix = string.Empty;
    // });
// }

app.UseCors();

app.UseHttpsRedirection();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
