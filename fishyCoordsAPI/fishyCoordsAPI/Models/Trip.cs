using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fishyCoordsAPI.Models
{
    public class Trip
    {
        public string Id { get; set; }
        public string VesselId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public Trip()
        {
            //Id = System.Guid.NewGuid().ToString();
        }

        public Trip(string id, string vesselId, DateTime start, DateTime end)
        {
            Id = id;
            VesselId = vesselId;
            Start = start;
            End = end;
        }

        public int TotalDays()
        {
            return (End - Start).Days;
        }
    }
}
