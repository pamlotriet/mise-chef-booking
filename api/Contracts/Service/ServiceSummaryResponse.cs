namespace Portfolio.Starter.Api.Contracts.Service
{
    public record ServiceSummaryResponse(
        Guid Id,
        string Name,
        decimal Price,
        string? ImageUrl);
}
