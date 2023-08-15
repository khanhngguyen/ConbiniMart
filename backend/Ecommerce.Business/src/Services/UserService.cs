using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Business.src.Dtos;
using Ecommerce.Business.src.ServiceInterfaces;
using Ecommerce.Domain.src.Entities;
using Ecommerce.Domain.src.RepoInterfaces;

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
            // var user = await _userRepo.CreateOne(_mapper.Map<User>(dto));
            // return _mapper.Map<UserReadDto>(user);
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
                throw new Exception("User not found");
            }
            if (updateUser.FirstName is null || updateUser.FirstName == "") updateUser.FirstName = found.FirstName;
            if (updateUser.LastName is null || updateUser.LastName == "") updateUser.LastName = found.Lastname;
            var updated = await _userRepo.UpdateOneById(id, _mapper.Map<User>(updateUser));
            return _mapper.Map<UserReadDto>(updated);
        }
    }
}