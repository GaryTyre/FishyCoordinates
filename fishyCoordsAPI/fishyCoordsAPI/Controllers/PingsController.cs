using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace fishyCoordsAPI.Controllers
{
    [EnableCors("HighlyPromiscuousCors")]
    [ApiController]
    public class PingsController : ControllerBase
    {
        Data.DB data;

        public PingsController()
        {
            data = new Data.DB();
        }

        [HttpGet("api/vessels/{vesselId}/trips/{tripId}/pings")]
        public ActionResult<List<Models.Ping>> GetPings(string id, string tripId)
        {
            return data.pings;
        }

        [HttpGet("api/vessels/{vesselId}/trips/{tripId}/pings/{pingId}")]
        public ActionResult<Models.Ping> GetPings(string id, string tripId, string pingId)
        {
            return data.pings.First();
        }
    }
}