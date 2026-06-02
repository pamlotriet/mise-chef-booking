namespace Portfolio.Starter.Api.Contracts.Service
{
    public record ServiceResponse(
        Guid Id,
        string Name,
        string Description,
        decimal Price,
        int DurationMinutes,
        string? ImageUrl,
        bool IsActive);
}
