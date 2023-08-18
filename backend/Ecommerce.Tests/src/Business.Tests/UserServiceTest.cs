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
            var userCreateDto = new UserCreateDto { 
                FirstName = "Mary",
                LastName = "Jane",
                Email = "mary@mail.com",
                Avatar = new UserImageCreateDto {},
                Password = "mary123"
            };
            var returnedUser = new User {
                Id = new Guid(),
                FirstName = "Mary",
                Lastname = "Jane",
                Email = "mary@mail.com",
                Avatar = new UserImage {},
                Password = "mary123",
                Salt = new byte[32],
                Role = Role.User
            };
            _userRepoMock.Setup(x => x.CreateOne(It.IsAny<User>())).ReturnsAsync(returnedUser);

            //Act
            var createdUser = await _userService.CreateOne(userCreateDto);
            
            //Assert
            Assert.NotNull(createdUser);
            Assert.IsType<UserReadDto>(createdUser);
            Assert.Equal(userCreateDto.FirstName, createdUser.FirstName);
            Assert.Equal(userCreateDto.LastName, createdUser.Lastname);
            Assert.Equal(userCreateDto.Email, createdUser.Email);
            Assert.Equal(Role.User, createdUser.Role);
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
        }
    }
}