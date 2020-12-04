using EFDataAccessLib.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrackMyStuff.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : BaseController
    {
        [HttpGet]
        public int Get()
        {
            var result = DBContext.Item.Count();

            return result;
        }
    }
}
