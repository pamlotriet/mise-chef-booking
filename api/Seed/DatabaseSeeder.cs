using Microsoft.AspNetCore.Identity;
using Portfolio.Starter.Api.Entities;

namespace Portfolio.Starter.Api.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

        foreach (var role in new[] { "Admin", "User", "Staff" })
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
        }

        const string adminEmail = "admin@portfolio.local";
        var admin = await userManager.FindByEmailAsync(adminEmail);

        if (admin is null)
        {
            admin = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "Portfolio Admin",
                Status = UserStatus.Active
            };

            await userManager.CreateAsync(admin, "ChangeMe123!");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}
