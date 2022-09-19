using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;
        public AccountController(UserManager<AppUser> userManager, DataContext context,
        SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
        }
    

        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Token = await _tokenService.CreateToken(user),
            };
        }






        [AllowAnonymous]
        [HttpPost("phonelogin")]
        public async Task<ActionResult> phonelogin(SignupDto signupDto)
        {

           var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == signupDto.phonenumber);

           if(user != null){
               var result = await _signInManager.CheckPasswordSignInAsync(user, signupDto.password, false);
               if (result.Succeeded){
               return Ok(CreateUserObject(user).Result);
            }
           }


           return Ok("problem");
       
        }



        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<ActionResult> signup(SignupDto signupDto)
        {
            var user = _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == signupDto.phonenumber);
    

            if(user.Result == null){ 

            var rand = new Random();
            int code = rand.Next(1, 10000);


            var usercreate = new AppUser
            {
                DisplayName = signupDto.username,
                UserName = signupDto.username.Replace(" ", "")+string.Format(code.ToString()),
                PhoneNumber = signupDto.phonenumber,
                PhoneNumberConfirmed = false
                
            };

            var result = await _userManager.CreateAsync(usercreate, signupDto.password);
            var roleResult = await _userManager.AddToRoleAsync(usercreate, "Member");
                  
             return Ok(CreateUserObject(usercreate).Result);

            }
            return Ok("problem");
           
        }

        [AllowAnonymous]
        [HttpPost("forgetpass")]
        public async Task<ActionResult> forgetpass(SignupDto signupDto)
        {

            var user = await _context.Users.Where(u => u.PhoneNumber == signupDto.phonenumber).SingleOrDefaultAsync();
            
            if(user != null){
                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, signupDto.password);
                return Ok(CreateUserObject(user).Result);
            }
            

            return Ok("problem");

        }


    
    }
} 