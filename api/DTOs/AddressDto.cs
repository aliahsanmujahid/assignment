using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddressDto
    {
       public string Phone { get; set; }
       public string UserAddress { get; set; }
       public string district { get; set; }
       public string upazila { get; set; }
       
    }
}