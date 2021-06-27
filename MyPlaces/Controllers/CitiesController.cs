using Microsoft.AspNetCore.Mvc;
using MyPlaces.Data.Entities;
using MyPlaces.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MyPlaces.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        IRepository<City> _repo;

        private CitiesController() { }

        public CitiesController(IRepository<City> repository)
        {
            _repo = repository;
        }

        [HttpPost]
        public async Task<ActionResult<City>> Create([FromBody] City city, CancellationToken cancellationToken = default)
        {
            try
            {
                await _repo.Add(city, cancellationToken);

                return CreatedAtAction(nameof(GetCityAsync), new { id = city.Id }, city);
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<City>> GetCityAsync(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var city = await _repo.Get(id, cancellationToken);

                if (city == null)
                {
                    return NotFound();
                }

                return Ok(city);
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetAllCitysAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                var citys = await _repo.GetAll(cancellationToken);

                return Ok(citys);
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateCity(
            Guid id,
            [FromBody] City city,
            CancellationToken cancellationToken = default)
        {
            if (id != city.Id)
            {
                return ValidationProblem("Changing the entity Id while updating a City is forbidden");
            }

            try
            {
                var updatedCity = await _repo.Update(city, cancellationToken);

                return NoContent();
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCity(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                await _repo.Delete(id, cancellationToken);

                return NoContent();
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }
    }
}
