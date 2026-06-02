namespace Portfolio.Starter.Api.Contracts.Service
{
    public record UpdateServiceRequest(
        string Name,
        string Description,
        decimal Price,
        int DurationMinutes,
        string? ImageUrl,
        bool IsActive);
}
