namespace Portfolio.Starter.Api.Contracts.Service
{
    public record CusineResponse(
        Guid id,
        string name,
        bool isActive,
        DateTime createdAt
        );
}