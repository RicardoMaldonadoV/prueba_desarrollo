using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.DataAccess.Models
{
    public partial class Mantenimiento
    {
        public Mantenimiento()
        {
            Facturas = new HashSet<Factura>();
        }

        public int IdMantenimiento { get; set; }
        public byte? IdTienda { get; set; }
        public string? Estado { get; set; }
        public int? IdVehiculo { get; set; }
        public int? IdCliente { get; set; }
        public string? Descripcion { get; set; }
        public int? Presupuesto { get; set; }
        public string? UrlPictures { get; set; }

        public virtual Cliente? IdClienteNavigation { get; set; }
        public virtual Tiendum? IdTiendaNavigation { get; set; }
        public virtual Vehiculo? IdVehiculoNavigation { get; set; }
        public virtual ICollection<Factura> Facturas { get; set; }
    }
}
