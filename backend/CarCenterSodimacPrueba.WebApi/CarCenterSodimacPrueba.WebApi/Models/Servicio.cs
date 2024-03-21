using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class Servicio
    {
        public int IdServicio { get; set; }
        public string? Descripcion { get; set; }
        public int? ValorMin { get; set; }
        public int? ValorMan { get; set; }
    }
}
