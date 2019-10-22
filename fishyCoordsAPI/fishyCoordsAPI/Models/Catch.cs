using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fishyCoordsAPI.Models
{
    public class Catch
    {
        public string Id { get; set; }
        public DateTime Time { get; set; }
        public string TripId { get; set; }
        public Location Location { get; set; }
        public string CatchArea { get; set; }
        public decimal Quantity { get; set; }
        public string LGTIN { get; set; }

        public Catch()
        {
            //Id = System.Guid.NewGuid().ToString();
        }

        public Catch(string id, string tripId, DateTime time, Location location, string catchArea, decimal quantity, string lgtin)
        {
            Id = id;
            TripId = tripId;
            Time = time;
            Location = location;
            CatchArea = catchArea;
            Quantity = quantity;
            LGTIN = lgtin;
        }
    }
}