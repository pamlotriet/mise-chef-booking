using Microsoft.AspNetCore.Identity;
using Portfolio.Starter.Api.Data;
using Portfolio.Starter.Api.Entities;

namespace Portfolio.Starter.Api.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var dbContext = services.GetRequiredService<AppDbContext>();

        // Roles
        foreach (var role in new[] { "Admin", "Customer" })
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
            }
        }

        // Admin User
        const string adminEmail = "admin@portfolio.local";

        var admin = await userManager.FindByEmailAsync(adminEmail);

        if (admin is null)
        {
            admin = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "Chef Administrator",
                Status = UserStatus.Active
            };

            var result = await userManager.CreateAsync(
                admin,
                "ChangeMe123!");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }

        // Seed Services
        if (!dbContext.ChefServices.Any())
        {
            dbContext.ChefServices.AddRange(
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Private Dinner Experience",
                    Description =
                        "A bespoke multi-course dining experience prepared in the comfort of your home.",
                    Price = 2500m,
                    DurationMinutes = 180,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/small-event-catering.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Weekly Meal Prep",
                    Description =
                        "Customized meal preparation designed around your dietary requirements and lifestyle.",
                    Price = 1500m,
                    DurationMinutes = 120,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/small-event-catering.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Interactive Cooking Class",
                    Description =
                        "A hands-on cooking session where guests learn techniques and recipes from a private chef.",
                    Price = 1800m,
                    DurationMinutes = 150,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/small-event-catering.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Date Night Dining Experience",
                    Description =
                        "An intimate dining experience featuring a curated menu for two.",
                    Price = 2200m,
                    DurationMinutes = 150,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/small-event-catering.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Small Event Catering",
                    Description =
                        "Professional catering for birthdays, celebrations, and private gatherings.",
                    Price = 5000m,
                    DurationMinutes = 300,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/small-event-catering.jpg"
                });

            await dbContext.SaveChangesAsync();
        }
    }
}