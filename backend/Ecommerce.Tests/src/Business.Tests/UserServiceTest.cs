using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Business.src.Services;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;
using Moq;
using Xunit;

namespace Ecommerce.Tests.src.Business.Tests
{
    public class UserServiceTest
    {
        private readonly IUserService _userService;
        private readonly Mock<IUserRepo> _userRepoMock;
        private readonly IMapper _mapper;
        private readonly UserCreateDto _userCreateDto = new UserCreateDto { 
            FirstName = "Kim",
            LastName = "Nguyen",
            Email = "kim@mail.com",
            Avatar = new UserImageCreateDto {},
            Password = "kim123"
        };
        private readonly User _returnedUser = new User {
            Id = new Guid(),
            FirstName = "Kim",
            Lastname = "Nguyen",
            Email = "kim@mail.com",
            Avatar = new UserImage {},
            Password = "kim123",
            Salt = new byte[32],
            Role = Role.User
        };

        public UserServiceTest()
        {
            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            var mapper = mockMapper.CreateMapper();
            _userRepoMock = new();
            _mapper = mapper;
            _userService = new UserService(_userRepoMock.Object, _mapper);
        }

        [Fact]
        public async Task CreateNewUser_ValidUser_CreateSuccess()
        {
            //Arrange
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(_returnedUser);

            //Act
            var createdUser = await _userService.CreateOne(_userCreateDto);
            
            //Assert
            Assert.NotNull(createdUser);
            Assert.IsType<UserReadDto>(createdUser);
            Assert.Equal(_userCreateDto.FirstName, createdUser.FirstName);
            Assert.Equal(_userCreateDto.LastName, createdUser.Lastname);
            Assert.Equal(_userCreateDto.Email, createdUser.Email);
            Assert.Equal(Role.User, createdUser.Role);
            _userRepoMock.Verify(x => x.CreateOne(It.IsAny<User>()), Times.Once);
            _userRepoMock.Verify(x => x.CreateAdmin(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async Task CreateNewAdmin_ValidAdmin_CreateSuccess()
        {
            //Arrange
            var userCreateDto = new UserCreateDto { 
                FirstName = "Kim",
                LastName = "Nguyen",
                Email = "kim@mail.com",
                Avatar = new UserImageCreateDto {},
                Password = "kim123"
            };
            var returnedUser = new User {
                Id = new Guid(),
                FirstName = "Kim",
                Lastname = "Nguyen",
                Email = "kim@mail.com",
                Avatar = new UserImage {},
                Password = "kim123",
                Salt = new byte[32],
                Role = Role.Admin
            };
            _userRepoMock.Setup(x => x.CreateAdmin(It.IsAny<User>())).ReturnsAsync(returnedUser);

            //Act
            var createdAdmin = await _userService.CreateAdmin(userCreateDto);
            
            //Assert
            Assert.NotNull(createdAdmin);
            Assert.IsType<UserReadDto>(createdAdmin);
            Assert.Equal(userCreateDto.FirstName, createdAdmin.FirstName);
            Assert.Equal(userCreateDto.LastName, createdAdmin.Lastname);
            Assert.Equal(userCreateDto.Email, createdAdmin.Email);
            Assert.Equal(Role.Admin, createdAdmin.Role);
            _userRepoMock.Verify(x => x.CreateAdmin(It.IsAny<User>()), Times.Once);
            _userRepoMock.Verify(x => x.CreateOne(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async Task CreateNewUser_ExistedEmail_ThrowException()
        {
            //Arrange
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(_returnedUser);
            _userRepoMock.Setup(x => x.CheckEmail(It.IsAny<string>())).ReturnsAsync(true);
            UserCreateDto _existedEmail = new UserCreateDto { 
                FirstName = "Test",
                LastName = "Test",
                Email = "kim@mail.com",
                Avatar = new UserImageCreateDto {},
                Password = "test123"
            };

            //Act
            var exception = await Assert.ThrowsAsync<Exception>(async () => await _userService.CreateOne(_existedEmail));

            //Assert
            Assert.ThrowsAsync<Exception>(async () => await _userService.CreateOne(_existedEmail));
            Assert.Equal("Email is already used", exception.Message);
            _userRepoMock.Verify(x => x.CheckEmail(It.IsAny<string>()), Times.AtLeastOnce);
            _userRepoMock.Verify(x => x.CreateOne(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async Task GetAllUser_ValidUsers_ReturnSuccess()
        {
            //Arrange
            IEnumerable<User> result = new List<User> { _returnedUser };
            var queryOptions = new QueryOptions();
            _userRepoMock.Setup(x => x.GetAll(It.IsAny<QueryOptions>())).Returns(Task.FromResult(result));

            //Act
            await _userService.CreateOne(_userCreateDto);
            var users = await _userService.GetAll(queryOptions);

            //Assert
            Assert.NotEmpty(users);
            Assert.Equal(1, users.Count());
            Assert.Equal(_returnedUser.FirstName, users.ElementAt(0).FirstName);
            _userRepoMock.Verify(x => x.GetAll(It.IsAny<QueryOptions>()), Times.Once);
        }

        [Fact]
        public async Task GetOneById_ValidId_ReturnValidUser()
        {
            //Arrange
            var userReadDto = new UserReadDto {
                FirstName = "Kim",
                Lastname = "Nguyen",
                Email = "kim@mail.com",
                Avatar = new UserImageReadDto {},
                Role = Role.User,
            };
            _userRepoMock.Setup(x => x.GetOneById(It.IsAny<Guid>())).Returns(Task.FromResult(_returnedUser));

            //Act
            var createdUser = await _userService.CreateOne(_userCreateDto);
            // var result = new UserReadDto();
            var id = new Guid();
            if (createdUser != null)
            {
                id = createdUser.Id;
                // result = await _userService.GetOneById(createdUser.Id);
            }
            var result = await _userService.GetOneById(id);

            //Assert
            Assert.NotNull(result);
            Assert.IsType<UserReadDto>(result);
            Assert.Equal(userReadDto.FirstName, result.FirstName);
            Assert.Equal(userReadDto.Email, result.Email);
            _userRepoMock.Verify(x => x.GetOneById(It.IsAny<Guid>()), Times.Once);
        }

        [Fact]
        public async Task GetOneById_InvalidId_ReturnNull()
        {
            //Arrange
            var id = new Guid();
            await _userService.CreateOne(_userCreateDto);

            //Act
            var result = await _userService.GetOneById(id);

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateOneByid_ValidId_UpdateSuccess()
        {
            // Arrange
            var userUpdate = new UserUpdateDto {
                FirstName = "Khanh",
                LastName = "",
                Email = ""
            };
            var returnedUser = new User {
                Id = new Guid(),
                FirstName = "Khanh",
                Lastname = "Nguyen",
                Email = "kim@mail.com",
                Avatar = new UserImage {},
                Password = "kim123",
                Salt = new byte[32],
                Role = Role.User
            };
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(_returnedUser);
            _userRepoMock.Setup(x => x.GetOneById(It.IsAny<Guid>())).Returns(Task.FromResult(_returnedUser));
            _userRepoMock.Setup(x => x.UpdateOneById(It.IsAny<Guid>(), It.IsAny<User>())).ReturnsAsync(returnedUser);

            //Act
            var createdUser = await _userService.CreateOne(_userCreateDto);
            var id = new Guid();
            if (createdUser != null) 
            {
                id = createdUser.Id;
            }
            var result = await _userService.UpdateOneById(id, userUpdate);

            //Assert
            Assert.NotNull(result);
            Assert.IsType<UserReadDto>(result);
            Assert.Equal(userUpdate.FirstName, result.FirstName);
            Assert.NotEqual("", result.Lastname);
            _userRepoMock.Verify(x => x.UpdateOneById(It.IsAny<Guid>(), It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task UpdateOneById_InvalidId_ThrowException()
        {
            //Arrange
            var id = new Guid();
            await _userService.CreateOne(_userCreateDto);
            var userUpdate = new UserUpdateDto {
                FirstName = "Khanh",
                LastName = "",
                Email = ""
            };

            //Act
            Exception exception = await Assert.ThrowsAsync<Exception>(async () => await _userService.UpdateOneById(id, userUpdate));

            //Assert
            Assert.ThrowsAsync<Exception>(async () => await _userService.UpdateOneById(id, userUpdate));
            Assert.Equal("User not found", exception.Message);
            _userRepoMock.Verify(x => x.UpdateOneById(It.IsAny<Guid>(), It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async Task UpdatePassword_ValidId_UpdateSuccess()
        {
            //Arrange
            var returnedUser = new User {
                Id = new Guid(),
                FirstName = "Kim",
                Lastname = "Nguyen",
                Email = "kim@mail.com",
                Avatar = new UserImage {},
                Password = "newpassword",
                Salt = new byte[32],
                Role = Role.User
            };
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(_returnedUser);
            _userRepoMock.Setup(x => x.GetOneById(It.IsAny<Guid>())).Returns(Task.FromResult(_returnedUser));
            _userRepoMock.Setup(x => x.UpdatePassword(It.IsAny<User>())).ReturnsAsync(returnedUser);

            //Act
            var createdUser = await _userService.CreateOne(_userCreateDto);
            var id = new Guid();
            if (createdUser != null) 
            {
                id = createdUser.Id;
            }
            var result = await _userService.UpdatePassword(id, "newpassword");

            //Assert
            Assert.NotNull(result);
            Assert.IsType<UserReadDto>(result);
            _userRepoMock.Verify(x => x.UpdatePassword(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task UpdatePassword_InvalidId_ThrowException()
        {
            //Arrange
            var id = new Guid();
            await _userService.CreateOne(_userCreateDto);

            //Act
            Exception exception = await Assert.ThrowsAsync<Exception>(async () => await _userService.UpdatePassword(id, "newpassword"));

            //Assert
            Assert.ThrowsAsync<Exception>(async () => await _userService.UpdatePassword(id, "newpassword"));
            Assert.Equal("User not found", exception.Message);
            _userRepoMock.Verify(x => x.UpdatePassword(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async Task DeleteOneById_ValidId_ReturnTrue()
        {
            //Arrange
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(_returnedUser);
            _userRepoMock.Setup(x => x.GetOneById(It.IsAny<Guid>())).Returns(Task.FromResult(_returnedUser));
            _userRepoMock.Setup(x => x.DeleteOneById(It.IsAny<Guid>())).Returns(Task.FromResult(true));

            //Act
            var createdUser = await _userService.CreateOne(_userCreateDto);
            var id = new Guid();
            if (createdUser != null) 
            {
                id = createdUser.Id;
            }
            var result = await _userService.DeleteOneById(id);

            //Assert
            Assert.True(result);
            _userRepoMock.Verify(x => x.DeleteOneById(It.IsAny<Guid>()), Times.Once);
        }

        [Fact]
        public async Task DeleteOneById_InValidId_ReturnFalse()
        {
            //Arrange
            var id = new Guid();

            //Act
            var result = await _userService.DeleteOneById(id);

            //Assert
            Assert.False(result);
            _userRepoMock.Verify(x => x.DeleteOneById(It.IsAny<Guid>()), Times.Never);
        }
    }
}