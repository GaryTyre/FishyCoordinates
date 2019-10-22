using fishyCoordsAPI.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace fishyCoordsAPI.Data
{
    public class DB
    {
        public List<Models.Vessel> vessels { get; set; }
        public List<Models.Trip> trips { get; set; }
        public List<Models.Catch> catches { get; set; }
        public List<Models.Ping> pings { get; set; }
        public List<Models.Region> regions { get; set; }

        public DB()
        {
            // Vessels
            vessels = new List<Vessel>();
            var vessel1 = new Vessel("vessel1", "JAVA CRUISER - 8", "ID (Indonesia)", "85 NO. 1937 / MMA", "8658877");
            vessels.Add(vessel1);

            // Trips
            trips = new List<Trip>();
            var t = CreateTrip(vessel1.Id);
            var trip1 = new Trip("trip1", "vessel1", new DateTime(2018,10,30, 16,00,00), new DateTime(2018,11,25, 20,00,00));
            trips.Add(trip1);

            // Catches
            catches = new List<Catch>();
            // Legal Catches
            catches.Add(new Catch("catch1", "trip1", new DateTime(2018,11,5, 20,55,12), new Location(-11.24233m, 116.81144m), "57", 500, "843657328.1999.10011"));
            catches.Add(new Catch("catch2", "trip1", new DateTime(2018,11,5, 22,33,54), new Location(-11.73219m, 116.31705m), "57", 475, "843657328.1999.10012"));
            catches.Add(new Catch("catch3", "trip1", new DateTime(2018,11,12, 11,11,11), new Location(-11.388974m, 118.682771m), "57", 789, "843657328.1999.10013"));
            
            // Illegal Catches
            catches.Add(new Catch("catch5", "trip1", new DateTime(2018,11,19,00 ,00,42), new Location(-7.313334m, 125.369661m), "57", 1000, "843657328.1999.10014"));
            catches.Add(new Catch("catch6", "trip1", new DateTime(2018,11,25, 07,07,58), new Location(-8.271493m, 120.022859m), "57", 1000, "843657328.1999.10015"));

            // Catches At Risk
            catches.Add(new Catch("catch4", "trip1", new DateTime(2018,11,18, 22,10,28), new Location(-8.27957m, 125.369661m), "57", 1234, "843657328.1999.10016"));
            
            // Pings
            pings = GetPingsFromFile(trip1.Id, "trip1.txt", new DateTime(2018, 10, 30, 16, 0, 0), 2);
        }

        public DB(IMemoryCache cache)
        {
            string regionCacheKey = "cachedRegions";

            var cachedRegions = cache.Get<List<Region>>(regionCacheKey);

            if (cachedRegions != null)
            {
                regions = cachedRegions;
            }
            else
            {
                regions = new List<Region>();

                XDocument doc = XDocument.Load("../../wfs.xml");
                XNamespace gml = "http://www.opengis.net/gml";
                XNamespace area = "http://www.fao.org/area";

                var areas = doc.Descendants(gml + "featureMember")
                    .Select(e =>
                        e.Element(area + "FAO_AREAS")
                );

                foreach (var a in areas)
                {
                    string regionId = a.Descendants(area + "F_CODE").First().Value;
                    var regionNameObj = a.Descendants(area + "NAME_EN").FirstOrDefault();
                    string regionName = regionNameObj != null ? regionNameObj.Value : String.Empty;

                    var firstPoly = a.Descendants(gml + "polygonMember").First();
                    var coords = firstPoly.Descendants(gml + "coordinates").First().Value.ToString()
                        .Split(" ")
                        .Select(x => new Region.LatLong() {
                            Latitude = Convert.ToDecimal(x.Split(',')[1]),
                            Longitude = Convert.ToDecimal(x.Split(',')[0])
                        })
                        .ToList();

                    regions.Add(new Region()
                    {
                        Name = regionName,
                        Area = regionId,
                        Polygon = coords
                    });
                }

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSize(1)
                .SetSlidingExpiration(TimeSpan.FromHours(24));

                cache.Set(regionCacheKey, regions, cacheEntryOptions);
            }
        }

        public Trip CreateTrip(string vesselId)
        {
            return new Trip()
            {
                VesselId = vesselId,
                Start = DateTime.Now.AddDays(-3),
                End = DateTime.Now
            };
        }

        public Catch CreateCatch(string vesselId, string tripId)
        {
            return new Catch()
            {
                TripId = tripId,
                Location = new Location(1, 1),
                LGTIN = "843657328.1999.10011",
                Quantity = 1000,
                CatchArea = "AREA1"
            };
        }

        public Ping CreatePing(string vesselId, string tripId)
        {
            return new Ping()
            {
                TripId = tripId,
                Location = new Location(1, 1)
            };
        }

        public List<Ping> GetPingsFromFile(string tripId, string fileName, DateTime startDate, int timeDiff)
        {
            List<Ping> pings = new List<Ping>();
            int counter = 0;
            string line;

            // Read the file and display it line by line.  
            System.IO.StreamReader file =
                new System.IO.StreamReader(@"../../" + fileName);
            while ((line = file.ReadLine()) != null)
            {
                if(!string.IsNullOrEmpty(line))
                {
                    var ping = new Ping(fileName + counter, tripId, 
                        startDate.AddHours(counter * timeDiff), 
                        new Location(Convert.ToDecimal(line.Split(',')[0]), Convert.ToDecimal(line.Split(',')[1]))
                    );

                    pings.Add(ping);
                }

                counter++;
            }

            file.Close();

            return pings;
        }
    }
}