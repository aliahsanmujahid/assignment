using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AddressController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public AddressController(UserManager<AppUser> userManager,DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }


        // [Authorize]
        [HttpGet("getaddress/{id}")]
        public ActionResult<AddressDto> GetUserAddress(int id)
        {

            var user =  _context.Users
            .Include(a => a.Address)
            .FirstOrDefault(i => i.Id == id);


            return _mapper.Map<Address, AddressDto>(user.Address);
        }


        // [Authorize]
        [HttpPost("createaddress/{id}")]
        public async Task<ActionResult<AddressDto>> CreateUserAddress(int id,AddressDto address)
        {
            
            var user = _context.Users
            .Include(a => a.Address)
            .FirstOrDefault(i => i.Id == id);

            user.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }
        
    }
}