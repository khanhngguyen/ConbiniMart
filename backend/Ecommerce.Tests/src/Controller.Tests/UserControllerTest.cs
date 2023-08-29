using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Business.src.Services;
using Ecommerce.Controller.src.Controllers;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Ecommerce.Tests.src.Controller.Tests
{
    public class UserControllerTest
    {
        private readonly UserController _userController;
        private readonly IUserService _userService;
        private readonly Mock<IUserRepo> _userRepoMock = new();
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

        public UserControllerTest()
        {
            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            var mapper = mockMapper.CreateMapper();
            _mapper = mapper;
            _userService = new UserService(_userRepoMock.Object, _mapper);
            _userController = new UserController(_userService);
        }

        [Fact]
        public async Task CreateNewUser_ValidUser_CreateSuccess()
        {
            //Act
            var response = await _userController.CreateOne(_userCreateDto);
            var result = response.Result as CreatedAtActionResult;

            //Assert
            Assert.NotNull(response);
            Assert.NotNull(result);
            // Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(201, result.StatusCode);
            _userRepoMock.Verify(x => x.CreateOne(It.IsAny<User>()), Times.Once);
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

            //Act
            var response = await _userController.CreateAdmin(userCreateDto);
            var result = response.Result as CreatedAtActionResult;

            //Assert
            Assert.NotNull(response);
            Assert.NotNull(result);
            // Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(201, result.StatusCode);
            _userRepoMock.Verify(x => x.CreateAdmin(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task GetAllUser_ValidUsers_ReturnSuccess()
        {
            //Arrange
            IEnumerable<User> users = new List<User> { _returnedUser };
            var queryOptions = new QueryOptions();
            _userRepoMock.Setup(x => x.GetAll(It.IsAny<QueryOptions>())).ReturnsAsync(users);
        
            //Act
            await _userController.CreateOne(_userCreateDto);
            var response = await _userController.GetAll(queryOptions);
            var result = response.Result as OkObjectResult;
        
            //Assert
            Assert.NotNull(response);
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            _userRepoMock.Verify(x => x.GetAll(It.IsAny<QueryOptions>()), Times.Once);

            //Arrange 
            var returnedUsers = result.Value as IEnumerable<UserReadDto>;

            //Assert
            Assert.NotEmpty(returnedUsers);
            Assert.Equal(1, returnedUsers.Count());
        }

        [Theory]
        [InlineData(0, -1)]
        [InlineData(-1, -1)]
        [InlineData(-1, 0)]
        public async Task GetAllUsers_InvalidQueryOptions_ReturnBadRequest(int pageNumer, int pageSize)
        {
            //Arrange
            var queryOptions = new QueryOptions {
                Search = string.Empty,
                OrderBy = "Newest first",
                OrderByDescending = false,
                PageNumber = pageNumer,
                PageSize = pageSize
            };

            //Act
            var response = await _userController.GetAll(queryOptions);
            var error = response.Result as BadRequestObjectResult;

            //Assert
            Assert.NotNull(response);
            Assert.NotNull(error);
            Assert.Equal(400, error.StatusCode);
            Assert.Equal("Page number & Page size must be positive integers", error.Value);
            _userRepoMock.Verify(x => x.GetAll(It.IsAny<QueryOptions>()), Times.Never);
        }

        [Fact]
        public async Task GetOneById_ValidId_ReturnUser()
        {
            //Arrange
            _userRepoMock.Setup(x => x.GetOneById(It.IsAny<Guid>())).Returns(Task.FromResult(_returnedUser));

            //Act
            var createdUser = await _userService.CreateOne(_userCreateDto);
            var id = new Guid();
            if (createdUser != null)
            {
                id = createdUser.Id;
            }
            var response = await _userController.GetOneById(id);
            var result = response.Result as OkObjectResult;

            //Assert
            Assert.NotNull(response);
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            _userRepoMock.Verify(x => x.GetOneById(It.IsAny<Guid>()), Times.AtLeastOnce);
        }

        [Fact]
        public async Task GetOneById_InvalidId_ReturnNotFound()
        {
            //Arrange
            var id = new Guid();

            //Act
            var response = await _userController.GetOneById(id);
            var error = response.Result as NotFoundResult;

            //Assert
            Assert.NotNull(response);
            Assert.Equal(404, error.StatusCode);
            _userRepoMock.Verify(x => x.GetOneById(It.IsAny<Guid>()), Times.Once);
        }

        // [Fact]
        // public async Task DeleteOneById_ValidId_DeleteSuccess()
        // {
        //     //Arrange
        //     _userRepoMock.Setup(x => x.DeleteOneById(It.IsAny<Guid>())).ReturnsAsync(true);

        //     //Act
        //     var createdUser = await _userService.CreateOne(_userCreateDto);
        //     var id = new Guid();
        //     if (createdUser != null) id = createdUser.Id;
        //     var response = await _userController.DeleteOneById(id);
        //     var result = response.Result as OkObjectResult;

        //     //Assert
        //     Assert.NotNull(response);
        //     Assert.NotNull(result);
        //     Assert.Equal(200, result.StatusCode);
        //     _userRepoMock.Verify(x => x.DeleteOneById(It.IsAny<Guid>()), Times.Once);
        // }
    }
}