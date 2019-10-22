using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fishyCoordsAPI.Models
{
    public class Vessel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Flag { get; set; }
        public string RegistrationNumber { get; set; }
        public string IMONumber { get; set; }

        public Vessel()
        {
        }

        public Vessel(string id, string name, string flag, string regNumber, string imo)
        {
            Id = id;
            Name = name;
            Flag = flag;
            RegistrationNumber = regNumber;
            IMONumber = imo;
        }
    }
}
