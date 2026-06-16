namespace Portfolio.Starter.Api.Entities
{
    public class ChefService
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public required string Description { get; set; }

        public Guid CuisineId { get; set; }

        public Cuisine Cuisine { get; set; } = null!;

        public Guid ChefId { get; set; }
        public ApplicationUser Chef { get; set; } = null!;
        public int MinimumGuests { get; set; }  

        public int MaximumGuests { get; set; }

        public decimal Price { get; set; }

        public int DurationMinutes { get; set; }

        public bool IsActive { get; set; }

        public required string? ImageUrl { get; set; }
    }
}
