using Portfolio.Starter.Api.Entities;

public interface IJwtTokenService
{
    string CreateToken(ApplicationUser user, IList<string> roles);
}
