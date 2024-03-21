using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class MantenimientoProducto
    {
        public int? IdMantenimiento { get; set; }
        public int? IdProducto { get; set; }
        public byte? Cantidad { get; set; }

        public virtual Mantenimiento? IdMantenimientoNavigation { get; set; }
        public virtual Producto? IdProductoNavigation { get; set; }
    }
}
