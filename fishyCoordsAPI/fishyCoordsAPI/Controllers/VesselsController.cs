using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace fishyCoordsAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("HighlyPromiscuousCors")]
    [ApiController]
    public class VesselsController : ControllerBase
    {
        Data.DB data;

        public VesselsController()
        {
            data = new Data.DB();
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<Models.Vessel>> Get()
        {
            return data.vessels;
        }
        
        [HttpGet("{id}")]
        public ActionResult<Models.Vessel> Get(string id)
        {
            return data.vessels.First();
        }
    }
}
