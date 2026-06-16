using Portfolio.Starter.Api.Entities;

namespace Portfolio.Starter.Api.Contracts.Service
{
    public record ServiceResponse(
        Guid Id,
        string Name,
        string Description,
        decimal Price,
        int DurationMinutes,
        Guid CuisineId,
        Guid ChefId,
        int MinimumGuests,
        int MaximumGuests,
        string? ImageUrl,
        bool IsActive);
}