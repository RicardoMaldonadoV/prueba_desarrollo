using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.DataAccess.Models
{
    public partial class Factura
    {
        public short IdFactura { get; set; }
        public DateTime? FechaFactura { get; set; }
        public int? IdCliente { get; set; }
        public int? IdMecanico { get; set; }
        public int? IdMantenimiento { get; set; }
        public byte? IdTienda { get; set; }
        public int? SubTotal { get; set; }
        public int? Descuento { get; set; }
        public string? DetalleDescuento { get; set; }
        public int? Total { get; set; }
        public int? Iva { get; set; }

        public virtual Cliente? IdClienteNavigation { get; set; }
        public virtual Mantenimiento? IdMantenimientoNavigation { get; set; }
        public virtual Mecanico? IdMecanicoNavigation { get; set; }
        public virtual Tiendum? IdTiendaNavigation { get; set; }
    }
}
