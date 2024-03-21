using CarCenterSodimacPrueba.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarCenterSodimacPrueba.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculoController : ControllerBase
    {
        private ModelContext _context;
        public VehiculoController(ModelContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Vehiculo>> ListarVehiculos()
        {
            return await _context.Vehiculos.ToListAsync();
        }

        [HttpGet("porDocCliente")]
        public async Task<List<Vehiculo>> ListarVehiculoPorDocCliente(string doc)
        {
            return await _context.Vehiculos.Where(x => x.IdClienteNavigation.Documento == doc).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Vehiculo>> CrearVehiculo(Vehiculo vehiculo)
        {
            try
            {
                await _context.Vehiculos.AddAsync(vehiculo);
                await _context.SaveChangesAsync();
                return vehiculo;
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Ocurrio un error con el registro");
                throw;
            }
        }
        [HttpPut]
        public async Task<ActionResult<Vehiculo>> ActualizarVehiculo(Vehiculo vehiculo)
        {
            if (vehiculo == null)
                return BadRequest("faltan datos");

            Vehiculo v = await _context.Vehiculos.FirstOrDefaultAsync(x => x.IdVehiculo == vehiculo.IdVehiculo);
            if (v == null)
                return NotFound();

            try
            {
                v.StatusVehiculo = vehiculo.StatusVehiculo;
                await _context.SaveChangesAsync();
                return v;
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Ocurrio un error al actualizar");
                throw;
            }
        }
    }
}
