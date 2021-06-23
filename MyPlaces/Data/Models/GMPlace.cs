using System;

#nullable enable

namespace MyPlaces.Data.Models
{
    /// <summary>
    /// A place on Google Maps (schools, public offices, restaurants).
    /// </summary>
    public class GMPlace
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public City City { get; set; } = new();
    }
}
