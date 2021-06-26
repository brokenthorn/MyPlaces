using System;
using System.Collections.Generic;

namespace MyPlaces.Data.Models
{
    // TODO: Refactor from exposing the EF entities directly in the API to using CityDto!
    public class CityDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public decimal Longitude { get; init; }
        public decimal Latitude { get; init; }
        public IList<Guid> GMPlaces { get; init; }
    }
}
