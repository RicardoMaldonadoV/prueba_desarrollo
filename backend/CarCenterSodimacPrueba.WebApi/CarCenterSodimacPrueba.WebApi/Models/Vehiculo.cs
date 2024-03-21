using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class Vehiculo
    {
        public Vehiculo()
        {
            Mantenimientos = new HashSet<Mantenimiento>();
        }

        public int IdVehiculo { get; set; }
        public string? Placa { get; set; }
        public string? Marca { get; set; }
        public byte? Modelo { get; set; }
        public string? Color { get; set; }
        public int? IdCliente { get; set; }
        public bool? StatusVehiculo { get; set; }
        public DateTime? FechaRegistro { get; set; }

        public virtual Cliente? IdClienteNavigation { get; set; }
        public virtual ICollection<Mantenimiento> Mantenimientos { get; set; }
    }
}
