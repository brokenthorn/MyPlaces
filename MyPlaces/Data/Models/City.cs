using System;
using System.Collections.Generic;

#nullable enable

namespace MyPlaces.Data.Models
{
    public class City
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }

        public ICollection<GMPlace> GMPlaces { get; set; } = new List<GMPlace>();
    }
}
