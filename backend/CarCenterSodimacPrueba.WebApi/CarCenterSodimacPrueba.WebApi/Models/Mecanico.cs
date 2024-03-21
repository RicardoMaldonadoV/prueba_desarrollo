using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class Mecanico
    {
        public Mecanico()
        {
            Facturas = new HashSet<Factura>();
        }

        public int IdMecanico { get; set; }
        public string? PNombre { get; set; }
        public string? SNombre { get; set; }
        public string? PApellido { get; set; }
        public string? SApellido { get; set; }
        public byte? IdTipoDoc { get; set; }
        public string? Documento { get; set; }
        public long? Celular { get; set; }
        public string? Correo { get; set; }
        public string? Direccion { get; set; }
        public byte? IdDepartamento { get; set; }
        public short? IdCiudad { get; set; }
        public int? IdBarrio { get; set; }
        public bool? Estado { get; set; }
        public byte? IdTienda { get; set; }

        public virtual Barrio? IdBarrioNavigation { get; set; }
        public virtual Ciudad? IdCiudadNavigation { get; set; }
        public virtual Departamento? IdDepartamentoNavigation { get; set; }
        public virtual Tiendum? IdTiendaNavigation { get; set; }
        public virtual TipoDoc? IdTipoDocNavigation { get; set; }
        public virtual ICollection<Factura> Facturas { get; set; }
    }
}
