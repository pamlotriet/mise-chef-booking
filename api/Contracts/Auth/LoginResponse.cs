namespace Portfolio.Starter.Api.Contracts.Auth;

public record LoginResponse(string AccessToken, string Email, IList<string> Roles);
