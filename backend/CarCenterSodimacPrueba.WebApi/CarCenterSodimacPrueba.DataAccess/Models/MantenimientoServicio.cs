using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.DataAccess.Models
{
    public partial class MantenimientoServicio
    {
        public int? IdMantenimiento { get; set; }
        public int? IdMecanico { get; set; }
        public int? IdServicio { get; set; }
        public int? ValorMnoObra { get; set; }

        public virtual Mantenimiento? IdMantenimientoNavigation { get; set; }
        public virtual Mecanico? IdMecanicoNavigation { get; set; }
        public virtual Servicio? IdServicioNavigation { get; set; }
    }
}
