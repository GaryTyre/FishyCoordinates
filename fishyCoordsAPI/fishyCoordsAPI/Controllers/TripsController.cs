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
    public class TripsController : ControllerBase
    {
        Data.DB data;

        public TripsController()
        {
            data = new Data.DB();
        }

        [HttpGet("api/vessels/{vesselId}/trips")]
        public ActionResult<IEnumerable<Models.Trip>> GetTrips(string vesselId)
        {
            return data.trips;
        }

        [HttpGet("api/vessels/{vesselId}/trips/{tripId}")]
        public ActionResult<Models.Trip> GetTrip(string vesselId, string tripId)
        {
            return data.trips.First();
        }
    }
}