using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fishyCoordsAPI.Models
{
    public class Ping
    {
        public string Id;
        public string TripId;
        public DateTime Time;
        public Location Location;

        public Ping()
        {
            //Id = System.Guid.NewGuid().ToString();
        }

        public Ping(string id, string tripId, DateTime time, Location location)
        {
            Id = id;
            TripId = tripId;
            Time = time;
            Location = location;
        }
    }
}