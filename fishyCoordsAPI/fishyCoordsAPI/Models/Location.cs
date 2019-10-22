using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fishyCoordsAPI.Models
{
    public class Location
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        
        public Location(decimal lat, decimal lng)
        {
            Latitude = lat;
            Longitude = lng;
        }
    }
}
