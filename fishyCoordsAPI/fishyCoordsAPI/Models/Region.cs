using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fishyCoordsAPI.Models
{
    public class Region
    {
        public struct LatLong
        {
            public decimal Latitude;
            public decimal Longitude;
        }

        public string Area;
        public string Name;
        public List<LatLong> Polygon;
    }
}
