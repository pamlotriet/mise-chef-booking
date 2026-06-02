using Microsoft.AspNetCore.Identity;

namespace Portfolio.Starter.Api.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FullName { get; set; } = string.Empty;
    public UserStatus Status { get; set; } = UserStatus.Pending;
    public string? InviteToken { get; set; }
    public DateTimeOffset? InviteTokenExpiresAt { get; set; }
}
