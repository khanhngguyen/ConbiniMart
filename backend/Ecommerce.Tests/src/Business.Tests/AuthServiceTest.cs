using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Business.src.Services;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Moq;
using Xunit;

namespace Ecommerce.Tests.src.Business.Tests
{    
    public class AuthServiceTest
    {
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
        
        public AuthServiceTest()
        {
            _authService = new AuthService(_userRepoMock.Object);
        }

        [Fact]
        public async Task VerifyCredentials_ValidCredentials_ReturnToken()
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
            var token = await _authService.VerifyCredentials(credentials);

            //Assert
            Assert.NotNull(token);
            Assert.IsType<string>(token);
            _userRepoMock.Verify(x => x.FindByEmail(It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async Task VerifyCredentials_InvalidEmail_ThrowException()
        {
            //Arrange
            var credentials = new UserCredentialsDto {
                Email = "nguyen@mail.com",
                Password = "kim123"
            };

            //Act
            PasswordService.HashPassword(_user.Password, out var hashed, out var salt);
            _user.Password = hashed;
            _user.Salt = salt;
            await _userRepoMock.Object.CreateOne(_user);
            Exception exception = await Assert.ThrowsAsync<Exception>(async () => await _authService.VerifyCredentials(credentials));

            //Assert
            Assert.ThrowsAsync<Exception>(async () => await _authService.VerifyCredentials(credentials));
            Assert.Equal("Email not found", exception.Message);
            _userRepoMock.Verify(x => x.FindByEmail(It.IsAny<string>()), Times.AtLeastOnce);
        }

        [Fact]
        public async Task VerifyCredentials_WrongPassword_ThrowException()
        {
            //Arrange
            var credentials = new UserCredentialsDto {
                Email = "kim@mail.com",
                Password = "wrongpassword"
            };
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(_user);
            _userRepoMock.Setup(x => x.FindByEmail(It.IsAny<string>())).ReturnsAsync(_user);

            //Act
            PasswordService.HashPassword(_user.Password, out var hashed, out var salt);
            _user.Password = hashed;
            _user.Salt = salt;
            await _userRepoMock.Object.CreateOne(_user);
            var exception = await Assert.ThrowsAsync<AuthenticationException>(async () => await _authService.VerifyCredentials(credentials));

            //Assert
            Assert.ThrowsAsync<AuthenticationException>(async () => await _authService.VerifyCredentials(credentials));
            Assert.Equal("Password incorrect", exception.Message);
            _userRepoMock.Verify(x => x.FindByEmail(It.IsAny<string>()), Times.AtLeastOnce);
        }
    }
}