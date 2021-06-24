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
    public class GMPlacesController : ControllerBase
    {
        IRepository<GMPlace> _repo;

        private GMPlacesController() { }

        public GMPlacesController(IRepository<GMPlace> repository)
        {
            _repo = repository;
        }

        [HttpPost]
        public async Task<ActionResult<GMPlace>> Create([FromBody] GMPlace gmPlace, CancellationToken cancellationToken = default)
        {
            try
            {
                await _repo.Add(gmPlace, cancellationToken);

                return CreatedAtAction(nameof(GetGMPlaceAsync), new { id = gmPlace.Id }, gmPlace);
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<GMPlace>> GetGMPlaceAsync(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var gmPlace = await _repo.Get(id, cancellationToken);

                if (gmPlace == null)
                {
                    return NotFound();
                }

                return Ok(gmPlace);
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GMPlace>>> GetAllGMPlacesAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                var gmPlaces = await _repo.GetAll(cancellationToken);

                return Ok(gmPlaces);
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateGMPlace(
            Guid id,
            [FromBody] GMPlace gmPlace,
            CancellationToken cancellationToken = default)
        {
            if (id != gmPlace.Id)
            {
                return ValidationProblem("Changing the entity Id while updating a GMPlace is forbidden");
            }

            try
            {
                var updatedGMPlace = await _repo.Update(gmPlace, cancellationToken);

                return NoContent();
            }
            catch (Exception ex) { return Problem(ex.Message); }
        }

        [HttpDelete("id:guid")]
        public async Task<IActionResult> DeleteGMPlace(Guid id, CancellationToken cancellationToken = default)
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
