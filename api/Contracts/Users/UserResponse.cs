namespace Portfolio.Starter.Api.Contracts.Users;

public record UserResponse(Guid Id, string Email, string FullName, IList<string> Roles);
