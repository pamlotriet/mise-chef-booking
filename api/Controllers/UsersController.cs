using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Starter.Api.Contracts.Users;
using Portfolio.Starter.Api.Entities;

namespace Portfolio.Starter.Api.Controllers;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = "Admin")]
public class UsersController(UserManager<ApplicationUser> userManager) : ControllerBase
{
    [HttpPost("invite")]
    public async Task<IActionResult> InviteUser(InviteUserRequest request)
    {
        var existing = await userManager.FindByEmailAsync(request.Email);

        if (existing is not null)
            return BadRequest("User already exists.");

        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            UserName = request.Email,
            Email = request.Email,
            FullName = request.FullName,
            Status = UserStatus.Pending,
            InviteToken = Guid.NewGuid().ToString("N"),
            InviteTokenExpiresAt = DateTimeOffset.UtcNow.AddDays(7)
        };

        var result = await userManager.CreateAsync(user);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        await userManager.AddToRoleAsync(user, request.Role);

        return Ok(new
        {
            user.Email,
            user.FullName,
            user.Status,
            user.InviteToken,
            InviteLink = $"http://localhost:4200/accept-invite?token={user.InviteToken}"
        });
    }
}
