using System.Globalization;

namespace Portfolio.Starter.Api.Entities
{
    public class Cuisine
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
