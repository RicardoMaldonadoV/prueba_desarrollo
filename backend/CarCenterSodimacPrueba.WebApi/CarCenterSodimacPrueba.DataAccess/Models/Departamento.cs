using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.DataAccess.Models
{
    public partial class Departamento
    {
        public Departamento()
        {
            Ciudads = new HashSet<Ciudad>();
            Clientes = new HashSet<Cliente>();
            Mecanicos = new HashSet<Mecanico>();
            Tienda = new HashSet<Tiendum>();
        }

        public byte IdDepartamento { get; set; }
        public string? Nombre { get; set; }

        public virtual ICollection<Ciudad> Ciudads { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Mecanico> Mecanicos { get; set; }
        public virtual ICollection<Tiendum> Tienda { get; set; }
    }
}
