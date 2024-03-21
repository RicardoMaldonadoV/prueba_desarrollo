using CarCenterSodimacPrueba.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarCenterSodimacPrueba.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private ModelContext _context;
        public LocationController(ModelContext context)
        {
            _context = context;
        }

        [HttpGet("Departamentos")]
        public async Task<List<Departamento>> ListarDptos()
        {
            return await _context.Departamentos.ToListAsync();
        }
        [HttpGet("CiudadesPorDpto")]
        public async Task<List<Ciudad>> ListarCiudadesPorDpto(short id_departamento)
        {
            return await _context.Ciudads.Where(x => x.IdDepartamento == id_departamento).ToListAsync();
        }

        [HttpGet("BarriosPorCiudad")]
        public async Task<List<Barrio>> ListarBarrios(int id_ciudad)
        {
            return await _context.Barrios.Where(x => x.IdCiudad == id_ciudad).ToListAsync();
        }

        [HttpGet("Tiendas")]
        public async Task<List<Tiendum>> ListarTiendas()
        {
            return await _context.Tienda.ToListAsync();
        }
    }
}
