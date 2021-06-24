using System;
using System.Collections.Generic;

#nullable enable

namespace MyPlaces.Data.Entities
{
    public class City
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        /// <summary>Longitude (x map coordinate)</summary>
        /// <remarks>
        /// Range is [-180,180] inclusive. Precision is DECIMAL(16,13).
        /// <br></br>
        /// Note that Google Maps coordinates are Lat then Lng.
        /// </remarks>
        public decimal Longitude { get; set; }

        /// <summary>Latitude (y map coordinate)</summary>
        /// <remarks>
        /// Range is [-90,90] inclusive. Precision is DECIMAL(16,14).
        /// <br></br>
        /// Note that Google Maps coordinates are Lat then Lng.
        /// </remarks>
        public decimal Latitude { get; set; }

        public ICollection<GMPlace> GMPlaces { get; set; } = new List<GMPlace>();
    }
}
