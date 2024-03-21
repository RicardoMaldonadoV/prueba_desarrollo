using CarCenterSodimacPrueba.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarCenterSodimacPrueba.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MantenimientoController : ControllerBase
    {
        private ModelContext _context;
        public MantenimientoController(ModelContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Mantenimiento>> ListarMantenimiento()
        {
            return await _context.Mantenimientos.ToListAsync();
        }

        [HttpGet("porDocCliente")]
        public async Task<List<Mantenimiento>> ListarMantenimientoDocCliente(string doc)
        {
            return await _context.Mantenimientos.Where(x => x.IdClienteNavigation.Documento == doc).OrderBy(x=> x.IdMantenimiento).ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Mantenimiento>> CrearMantenimiento(Mantenimiento mantenimiento)
        {
            try
            {
                await _context.Mantenimientos.AddAsync(mantenimiento);
                await _context.SaveChangesAsync();
                return mantenimiento;
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Ocurrio un error con el registro");
                throw;
            }
        }
        [HttpPut]
        public async Task<ActionResult<Mantenimiento>> ActualizarMantenimiento(Mantenimiento mantenimiento)
        {
            if (mantenimiento == null)
                return BadRequest("faltan datos");

            Mantenimiento m = await _context.Mantenimientos.FirstOrDefaultAsync(x => x.IdMantenimiento == mantenimiento.IdMantenimiento);
            if ( m == null)
                return NotFound();

            try
            {
                m.Estado = m.Estado;
                m.IdTienda = m.IdTienda;
                await _context.SaveChangesAsync();
                return m;
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Ocurrio un error al actualizar");
                throw;
            }
        }
    }
}
