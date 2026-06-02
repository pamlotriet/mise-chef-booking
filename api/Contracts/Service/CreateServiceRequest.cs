namespace Portfolio.Starter.Api.Contracts.Service
{
    public record CreateServiceRequest(
        string Name,
        string Description,
        decimal Price,
        int DurationMinutes,
        string? ImageUrl
        );
}
