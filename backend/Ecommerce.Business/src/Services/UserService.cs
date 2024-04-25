using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;
using Ecommerce.Domain.src.Shared;

namespace Ecommerce.Business.src.Services
{
    public class UserService : BaseService<User, UserCreateDto, UserReadDto, UserUpdateDto>, IUserService
    {
        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper)
        {
            _userRepo = userRepo;
        }

        public override async Task<UserReadDto> CreateOne(UserCreateDto dto)
        {
            //Check if email is already used
            var check = await CheckEmail(dto.Email);
            if (check) throw new Exception("Email is already used");

            var user = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            user.Password = hashedPassword;
            user.Salt = salt;

            var created = await _userRepo.CreateOne(user);
            return _mapper.Map<UserReadDto>(created);
        }
        public async Task<UserReadDto> CreateAdmin(UserCreateDto dto)
        {
            var check = await CheckEmail(dto.Email);
            if (check) throw new Exception("Email is already used");

            var admin = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            admin.Password = hashedPassword;
            admin.Salt = salt;
            
            var created = await _userRepo.CreateAdmin(admin);
            return _mapper.Map<UserReadDto>(created);
        }
        public async Task<bool> CheckEmail(string email)
        {
            return await _userRepo.CheckEmail(email);
        }
        public override async Task<UserReadDto> UpdateOneById(Guid id, UserUpdateDto updateUser)
        {
            var found = await _userRepo.GetOneById(id);
            if (found is null)
            {
                await _userRepo.DeleteOneById(id);
                throw  CustomException.NotFoundException("User not found");
            }
            if (updateUser.FirstName is null || updateUser.FirstName == "" || updateUser.FirstName == "string") updateUser.FirstName = found.FirstName;
            if (updateUser.LastName is null || updateUser.LastName == "" || updateUser.LastName  == "string") updateUser.LastName = found.Lastname;
            if (updateUser.Email is null || updateUser.Email == "" || updateUser.Email == "string") updateUser.Email = found.Email;
            var updated = await _userRepo.UpdateOneById(id, _mapper.Map<User>(updateUser));
            return _mapper.Map<UserReadDto>(updated);
        }
        public async Task<UserReadDto> UpdatePassword(Guid id, string newPassword)
        {
            var found = await _userRepo.GetOneById(id) ?? throw CustomException.NotFoundException("User not found");
            PasswordService.HashPassword(newPassword, out var hashedPassword, out var salt);
            found.Password = hashedPassword;
            found.Salt = salt;
            return _mapper.Map<UserReadDto>(await _userRepo.UpdatePassword(found));
        }
    }
}