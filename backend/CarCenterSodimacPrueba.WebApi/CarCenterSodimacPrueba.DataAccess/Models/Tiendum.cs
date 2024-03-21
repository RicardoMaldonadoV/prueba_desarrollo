using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.DataAccess.Models
{
    public partial class Tiendum
    {
        public Tiendum()
        {
            Facturas = new HashSet<Factura>();
            Mantenimientos = new HashSet<Mantenimiento>();
            Mecanicos = new HashSet<Mecanico>();
        }

        public byte IdTienda { get; set; }
        public string? Nombre { get; set; }
        public byte? IdDepartamento { get; set; }
        public short? IdCiudad { get; set; }
        public int? IdBarrio { get; set; }

        public virtual Barrio? IdBarrioNavigation { get; set; }
        public virtual Ciudad? IdCiudadNavigation { get; set; }
        public virtual Departamento? IdDepartamentoNavigation { get; set; }
        public virtual ICollection<Factura> Facturas { get; set; }
        public virtual ICollection<Mantenimiento> Mantenimientos { get; set; }
        public virtual ICollection<Mecanico> Mecanicos { get; set; }
    }
}
