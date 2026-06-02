using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Starter.Api.Contracts.Auth;
using Portfolio.Starter.Api.Contracts.Users;
using Portfolio.Starter.Api.Entities;

namespace Portfolio.Starter.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    UserManager<ApplicationUser> userManager,
    IJwtTokenService jwtTokenService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user is null || user.Status != UserStatus.Active)
            return Unauthorized();

        var passwordValid = await userManager.CheckPasswordAsync(user, request.Password);

        if (!passwordValid)
            return Unauthorized();

        var roles = await userManager.GetRolesAsync(user);
        var token = jwtTokenService.CreateToken(user, roles);

        return Ok(new LoginResponse(token, user.Email!, roles));
    }

    [HttpPost("accept-invite")]
    public async Task<IActionResult> AcceptInvite(AcceptInviteRequest request)
    {
        var user = await userManager.Users.FirstOrDefaultAsync(x => x.InviteToken == request.Token);

        if (user is null)
            return BadRequest("Invalid invite token.");

        if (user.InviteTokenExpiresAt < DateTimeOffset.UtcNow)
            return BadRequest("Invite token has expired.");

        var result = await userManager.AddPasswordAsync(user, request.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        user.Status = UserStatus.Active;
        user.InviteToken = null;
        user.InviteTokenExpiresAt = null;

        await userManager.UpdateAsync(user);

        return Ok();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserResponse>> Me()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (userId is null)
            return Unauthorized();

        var user = await userManager.FindByIdAsync(userId);

        if (user is null)
            return Unauthorized();

        var roles = await userManager.GetRolesAsync(user);

        return Ok(new UserResponse(user.Id, user.Email!, user.FullName, roles));
    }
}
