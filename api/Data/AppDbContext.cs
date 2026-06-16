using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Portfolio.Starter.Api.Entities;

namespace Portfolio.Starter.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<ChefService> ChefServices => Set<ChefService>();
    public DbSet<Cuisine> Cuisines => Set<Cuisine>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ChefService>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(2000);

            entity.Property(x => x.Price)
                .HasPrecision(18, 2);

            entity.Property(x => x.ImageUrl)
                .HasMaxLength(500);

            entity.HasOne(x => x.Cuisine)
                .WithMany()
                .HasForeignKey(x => x.CuisineId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Chef)
                .WithMany()
                .HasForeignKey(x => x.ChefId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<Cuisine>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasIndex(x => x.Name)
                .IsUnique();
        });
    }
}