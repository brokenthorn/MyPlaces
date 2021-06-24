using System;

namespace MyPlaces.Data.Models
{
    public class GMPlaceDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public decimal Longitude { get; init; }
        public decimal Latitude { get; init; }
        public Guid CityId { get; init; }
    }
}