using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace fishyCoordsAPI.Controllers
{
    [EnableCors("HighlyPromiscuousCors")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private IMemoryCache cache;

        Data.DB data;

        public RegionsController(IMemoryCache cache)
        {
            this.cache = cache;
            data = new Data.DB(this.cache);
        }

        [HttpGet("api/regions")]
        public ActionResult<List<Models.Region>> Get([FromQuery]string catchAreas)
        {
            if (catchAreas == null || catchAreas == "") { return BadRequest(); }
            var areaList = catchAreas.Split("-");
            return Ok(data.regions.Where((r)=> areaList.Contains(r.Area)).ToList());
        }
    }
}