using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        foreach (var role in new[] { "Admin", "Customer" })
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
            }
        }

        const string adminEmail = "admin@portfolio.local";

        var admin = await userManager.FindByEmailAsync(adminEmail);

        if (admin is null)
        {
            admin = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = adminEmail,
                NormalizedUserName = adminEmail.ToUpperInvariant(),
                Email = adminEmail,
                NormalizedEmail = adminEmail.ToUpperInvariant(),
                EmailConfirmed = true,
                FullName = "Chef Administrator",
                Status = UserStatus.Active
            };

            var result = await userManager.CreateAsync(admin, "ChangeMe123!");

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(x => x.Description));
                throw new InvalidOperationException($"Admin user could not be created: {errors}");
            }

            await userManager.AddToRoleAsync(admin, "Admin");
        }

        admin = await userManager.FindByEmailAsync(adminEmail)
            ?? throw new InvalidOperationException("Admin user was not found after creation.");

        if (!await dbContext.Cuisines.AnyAsync())
        {
            dbContext.Cuisines.AddRange(
                new Cuisine { Id = Guid.NewGuid(), Name = "Italian", IsActive = true },
                new Cuisine { Id = Guid.NewGuid(), Name = "French", IsActive = true },
                new Cuisine { Id = Guid.NewGuid(), Name = "Mediterranean", IsActive = true },
                new Cuisine { Id = Guid.NewGuid(), Name = "South African", IsActive = true },
                new Cuisine { Id = Guid.NewGuid(), Name = "Cape Malay", IsActive = true },
                new Cuisine { Id = Guid.NewGuid(), Name = "Asian Fusion", IsActive = true }
            );

            await dbContext.SaveChangesAsync();
        }

        if (!await dbContext.ChefServices.AnyAsync())
        {
            var italian = await dbContext.Cuisines.FirstAsync(x => x.Name == "Italian");
            var mediterranean = await dbContext.Cuisines.FirstAsync(x => x.Name == "Mediterranean");
            var capeMalay = await dbContext.Cuisines.FirstAsync(x => x.Name == "Cape Malay");
            var asianFusion = await dbContext.Cuisines.FirstAsync(x => x.Name == "Asian Fusion");

            dbContext.ChefServices.AddRange(
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Private Dinner Experience",
                    Description = "A bespoke multi-course dining experience prepared in the comfort of your home.",
                    CuisineId = italian.Id,
                    ChefId = admin.Id,
                    MinimumGuests = 2,
                    MaximumGuests = 8,
                    Price = 2500m,
                    DurationMinutes = 180,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/private-dinner.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Weekly Meal Prep",
                    Description = "Customized meal preparation designed around your dietary requirements and lifestyle.",
                    CuisineId = mediterranean.Id,
                    ChefId = admin.Id,
                    MinimumGuests = 1,
                    MaximumGuests = 6,
                    Price = 1500m,
                    DurationMinutes = 120,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/meal-prep.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Interactive Cooking Class",
                    Description = "A hands-on cooking session where guests learn techniques and recipes from a private chef.",
                    CuisineId = asianFusion.Id,
                    ChefId = admin.Id,
                    MinimumGuests = 2,
                    MaximumGuests = 10,
                    Price = 1800m,
                    DurationMinutes = 150,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/cooking-class.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Date Night Dining Experience",
                    Description = "An intimate dining experience featuring a curated menu for two.",
                    CuisineId = capeMalay.Id,
                    ChefId = admin.Id,
                    MinimumGuests = 2,
                    MaximumGuests = 2,
                    Price = 2200m,
                    DurationMinutes = 150,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/date-night.jpg"
                },
                new ChefService
                {
                    Id = Guid.NewGuid(),
                    Name = "Small Event Catering",
                    Description = "Professional catering for birthdays, celebrations, and private gatherings.",
                    CuisineId = mediterranean.Id,
                    ChefId = admin.Id,
                    MinimumGuests = 6,
                    MaximumGuests = 25,
                    Price = 5000m,
                    DurationMinutes = 300,
                    IsActive = true,
                    ImageUrl = "https://example.com/images/small-event-catering.jpg"
                }
            );

            await dbContext.SaveChangesAsync();
        }
    }
}