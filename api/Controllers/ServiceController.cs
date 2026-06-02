using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Starter.Api.Contracts.Service;
using Portfolio.Starter.Api.Data;

namespace Portfolio.Starter.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServicesController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceResponse>>> GetServices()
    {
        var services = await dbContext.ChefServices
            .AsNoTracking()
            .Where(service => service.IsActive)
            .Select(service => new ServiceResponse(
                service.Id,
                service.Name,
                service.Description,
                service.Price,
                service.DurationMinutes,
                service.ImageUrl,
                service.IsActive
            ))
            .ToListAsync();

        return Ok(services);
    }
}