using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class Barrio
    {
        public Barrio()
        {
            Clientes = new HashSet<Cliente>();
            Mecanicos = new HashSet<Mecanico>();
            Tienda = new HashSet<Tiendum>();
        }

        public int IdBarrio { get; set; }
        public string? Nombre { get; set; }
        public short? IdCiudad { get; set; }

        public virtual Ciudad? IdCiudadNavigation { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Mecanico> Mecanicos { get; set; }
        public virtual ICollection<Tiendum> Tienda { get; set; }
    }
}
