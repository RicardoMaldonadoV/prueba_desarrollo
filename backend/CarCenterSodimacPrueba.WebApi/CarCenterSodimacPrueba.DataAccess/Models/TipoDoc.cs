﻿using System;
using System.Collections.Generic;

namespace CarCenterSodimacPrueba.DataAccess.Models
{
    public partial class TipoDoc
    {
        public TipoDoc()
        {
            Clientes = new HashSet<Cliente>();
            Mecanicos = new HashSet<Mecanico>();
        }

        public short IdTipoDoc { get; set; }
        public string? TipoDoc1 { get; set; }
        public string? DescTipoDoc { get; set; }
        public DateTime? FechaCrea { get; set; }

        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Mecanico> Mecanicos { get; set; }
    }
}
