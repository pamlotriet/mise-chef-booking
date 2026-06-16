using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Starter.Api.Contracts.Service;
using Portfolio.Starter.Api.Data;

namespace Portfolio.Starter.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CuisineController(AppDbContext dbContext) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CusineResponse>>> GetCuisines()
        {
            var services = await dbContext.Cuisines
                .AsNoTracking()
                .Where(service => service.IsActive)
                .Select(service => new CusineResponse(
                    service.Id,
                    service.Name,
                    service.IsActive,
                    service.CreatedAt
                ))
                .ToListAsync();

            return Ok(services);
        }
    }
}