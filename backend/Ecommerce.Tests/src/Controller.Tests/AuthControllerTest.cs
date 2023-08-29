using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Business.src.Services;
using Ecommerce.Controller.src.Controllers;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Ecommerce.Tests.src.Controller.Tests
{
    public class AuthControllerTest
    {
        private readonly AuthController _authController;
        private readonly IAuthService _authService;
        private readonly Mock<IUserRepo> _userRepoMock = new();
        private readonly User _user = new User {
            Id = new Guid(),
            FirstName = "Kim",
            Lastname = "Nguyen",
            Email = "kim@mail.com",
            Avatar = new UserImage {},
            Password = "kim123",
            Salt = new byte[32],
            Role = Role.User
        };

        public AuthControllerTest()
        {
            _authService = new AuthService(_userRepoMock.Object);
            _authController = new AuthController(_authService);
        }

        [Fact]
        public async Task VerifyCrendentials_ValidCredentials_ReturnToken()
        {
            //Arrange
            var credentials = new UserCredentialsDto {
                Email = "kim@mail.com",
                Password = "kim123"
            };
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(_user);
            _userRepoMock.Setup(x => x.FindByEmail(It.IsAny<string>())).ReturnsAsync(_user);
            
            //Act
            PasswordService.HashPassword(_user.Password, out var hashed, out var salt);
            _user.Password = hashed;
            _user.Salt = salt;
            await _userRepoMock.Object.CreateOne(_user);
            var response = await _authController.VerifyCredentials(credentials);
            var result = response.Result as OkObjectResult;

            //Assert
            Assert.NotNull(response);
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<string>(result.Value);
        }
    }
}