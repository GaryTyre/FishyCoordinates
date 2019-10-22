using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace fishyCoordsAPI.Controllers
{
    [EnableCors("HighlyPromiscuousCors")]
    [ApiController]
    public class CatchesController : ControllerBase
    {
        Data.DB data;

        public CatchesController()
        {
            data = new Data.DB();
        }

        [HttpGet("api/vessels/{vesselId}/trips/{tripId}/catches")]
        public ActionResult<List<Models.Catch>> GetCatches(string id, string tripId)
        {
            return Ok(data.catches);
        }

        [HttpGet("api/vessels/{vesselId}/trips/{tripId}/catches/{catchId}")]
        public ActionResult<Models.Catch> GetCatches(string id, string tripId, string catchId)
        {
            return data.catches.First();
        }
    }
}