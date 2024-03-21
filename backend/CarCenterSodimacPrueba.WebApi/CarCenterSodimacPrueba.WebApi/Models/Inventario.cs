using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class Inventario
    {
        public byte? IdTienda { get; set; }
        public int? IdProducto { get; set; }
        public short? Stock { get; set; }

        public virtual Producto? IdProductoNavigation { get; set; }
        public virtual Tiendum? IdTiendaNavigation { get; set; }
    }
}
