using System;
using System.Collections.Generic;

namespace MyPlaces.Data.Models
{
    public class CityDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public decimal Longitude { get; init; }
        public decimal Latitude { get; init; }
        public IList<Guid> GMPlaces { get; init; }
    }
}
