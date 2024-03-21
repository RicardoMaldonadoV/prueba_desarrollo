using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class Ciudad
    {
        public Ciudad()
        {
            Barrios = new HashSet<Barrio>();
            Clientes = new HashSet<Cliente>();
            Mecanicos = new HashSet<Mecanico>();
            Tienda = new HashSet<Tiendum>();
        }

        public short IdCiudad { get; set; }
        public string? Nombre { get; set; }
        public byte? IdDepartamento { get; set; }

        public virtual Departamento? IdDepartamentoNavigation { get; set; }
        public virtual ICollection<Barrio> Barrios { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Mecanico> Mecanicos { get; set; }
        public virtual ICollection<Tiendum> Tienda { get; set; }
    }
}
