﻿using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class Producto
    {
        public int IdProducto { get; set; }
        public string? Descripcion { get; set; }
        public int? Precio { get; set; }
    }
}
