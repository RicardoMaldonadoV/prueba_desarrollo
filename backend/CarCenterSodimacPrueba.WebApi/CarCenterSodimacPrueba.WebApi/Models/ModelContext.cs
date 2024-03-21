using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CarCenterSodimacPrueba.WebApi.Models
{
    public partial class ModelContext : DbContext
    {
        public ModelContext()
        {
        }

        public ModelContext(DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Barrio> Barrios { get; set; } = null!;
        public virtual DbSet<Ciudad> Ciudads { get; set; } = null!;
        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<Departamento> Departamentos { get; set; } = null!;
        public virtual DbSet<Factura> Facturas { get; set; } = null!;
        public virtual DbSet<Inventario> Inventarios { get; set; } = null!;
        public virtual DbSet<Mantenimiento> Mantenimientos { get; set; } = null!;
        public virtual DbSet<MantenimientoProducto> MantenimientoProductos { get; set; } = null!;
        public virtual DbSet<MantenimientoServicio> MantenimientoServicios { get; set; } = null!;
        public virtual DbSet<Mecanico> Mecanicos { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<Servicio> Servicios { get; set; } = null!;
        public virtual DbSet<Tiendum> Tienda { get; set; } = null!;
        public virtual DbSet<TipoDoc> TipoDocs { get; set; } = null!;
        public virtual DbSet<Vehiculo> Vehiculos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseOracle("User Id=DEVBASE;Password=123456;Data Source=localhost:1521/xe;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("DEVBASE")
                .UseCollation("USING_NLS_COMP");

            modelBuilder.Entity<Barrio>(entity =>
            {
                entity.HasKey(e => e.IdBarrio)
                    .HasName("BARRIO_PK");

                entity.ToTable("BARRIO");

                entity.Property(e => e.IdBarrio)
                    .HasPrecision(10)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_BARRIO");

                entity.Property(e => e.IdCiudad)
                    .HasPrecision(5)
                    .HasColumnName("ID_CIUDAD");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("NOMBRE");

                entity.HasOne(d => d.IdCiudadNavigation)
                    .WithMany(p => p.Barrios)
                    .HasForeignKey(d => d.IdCiudad)
                    .HasConstraintName("BARRIO_CIUDAD_FK");
            });

            modelBuilder.Entity<Ciudad>(entity =>
            {
                entity.HasKey(e => e.IdCiudad)
                    .HasName("CIUDAD_PK");

                entity.ToTable("CIUDAD");

                entity.Property(e => e.IdCiudad)
                    .HasPrecision(5)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_CIUDAD");

                entity.Property(e => e.IdDepartamento)
                    .HasPrecision(2)
                    .HasColumnName("ID_DEPARTAMENTO");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("NOMBRE");

                entity.HasOne(d => d.IdDepartamentoNavigation)
                    .WithMany(p => p.Ciudads)
                    .HasForeignKey(d => d.IdDepartamento)
                    .HasConstraintName("CIUDAD_DEPARTAMENTO_FK");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.IdCliente)
                    .HasName("CLIENTE_PK");

                entity.ToTable("CLIENTE");

                entity.Property(e => e.IdCliente)
                    .HasPrecision(10)
                    .HasColumnName("ID_CLIENTE");

                entity.Property(e => e.Celular)
                    .HasPrecision(12)
                    .HasColumnName("CELULAR");

                entity.Property(e => e.Correo)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("CORREO");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("DIRECCION");

                entity.Property(e => e.Documento)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("DOCUMENTO");

                entity.Property(e => e.IdBarrio)
                    .HasPrecision(10)
                    .HasColumnName("ID_BARRIO");

                entity.Property(e => e.IdCiudad)
                    .HasPrecision(5)
                    .HasColumnName("ID_CIUDAD");

                entity.Property(e => e.IdDepartamento)
                    .HasPrecision(2)
                    .HasColumnName("ID_DEPARTAMENTO");

                entity.Property(e => e.IdTipoDoc)
                    .HasPrecision(2)
                    .HasColumnName("ID_TIPO_DOC");

                entity.Property(e => e.PApellido)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("P_APELLIDO");

                entity.Property(e => e.PNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("P_NOMBRE");

                entity.Property(e => e.SApellido)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("S_APELLIDO");

                entity.Property(e => e.SNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("S_NOMBRE");

                entity.HasOne(d => d.IdBarrioNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdBarrio)
                    .HasConstraintName("CLIENTE_BARRIO_FK");

                entity.HasOne(d => d.IdCiudadNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdCiudad)
                    .HasConstraintName("CLIENTE_CIUDAD_FK");

                entity.HasOne(d => d.IdDepartamentoNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdDepartamento)
                    .HasConstraintName("CLIENTE_DEPARTAMENTO_FK");

                entity.HasOne(d => d.IdTipoDocNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdTipoDoc)
                    .HasConstraintName("CLIENTE_TIPO_DOC_FK");
            });

            modelBuilder.Entity<Departamento>(entity =>
            {
                entity.HasKey(e => e.IdDepartamento)
                    .HasName("DEPARTAMENTO_PK");

                entity.ToTable("DEPARTAMENTO");

                entity.Property(e => e.IdDepartamento)
                    .HasPrecision(2)
                    .HasColumnName("ID_DEPARTAMENTO");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("NOMBRE");
            });

            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasKey(e => e.IdFactura)
                    .HasName("FACTURA_PK");

                entity.ToTable("FACTURA");

                entity.Property(e => e.IdFactura)
                    .HasPrecision(5)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_FACTURA");

                entity.Property(e => e.Descuento)
                    .HasPrecision(10)
                    .HasColumnName("DESCUENTO");

                entity.Property(e => e.DetalleDescuento)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("DETALLE_DESCUENTO");

                entity.Property(e => e.FechaFactura)
                    .HasColumnType("DATE")
                    .HasColumnName("FECHA_FACTURA");

                entity.Property(e => e.IdCliente)
                    .HasPrecision(10)
                    .HasColumnName("ID_CLIENTE");

                entity.Property(e => e.IdMantenimiento)
                    .HasPrecision(10)
                    .HasColumnName("ID_MANTENIMIENTO");

                entity.Property(e => e.IdMecanico)
                    .HasPrecision(10)
                    .HasColumnName("ID_MECANICO");

                entity.Property(e => e.IdTienda)
                    .HasPrecision(3)
                    .HasColumnName("ID_TIENDA");

                entity.Property(e => e.Iva)
                    .HasPrecision(10)
                    .HasColumnName("IVA");

                entity.Property(e => e.SubTotal)
                    .HasPrecision(10)
                    .HasColumnName("SUB_TOTAL");

                entity.Property(e => e.Total)
                    .HasPrecision(10)
                    .HasColumnName("TOTAL");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdCliente)
                    .HasConstraintName("FACTURA_CLIENTE_FK");

                entity.HasOne(d => d.IdMantenimientoNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdMantenimiento)
                    .HasConstraintName("FACTURA_MANTENIMIENTO_FK");

                entity.HasOne(d => d.IdMecanicoNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdMecanico)
                    .HasConstraintName("FACTURA_MECANICO_FK");

                entity.HasOne(d => d.IdTiendaNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdTienda)
                    .HasConstraintName("FACTURA_TIENDA_FK");
            });

            modelBuilder.Entity<Inventario>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("INVENTARIO");

                entity.Property(e => e.IdProducto)
                    .HasPrecision(6)
                    .HasColumnName("ID_PRODUCTO");

                entity.Property(e => e.IdTienda)
                    .HasPrecision(3)
                    .HasColumnName("ID_TIENDA");

                entity.Property(e => e.Stock)
                    .HasPrecision(5)
                    .HasColumnName("STOCK");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdProducto)
                    .HasConstraintName("INVENTARIO_PRODUCTO_FK");

                entity.HasOne(d => d.IdTiendaNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdTienda)
                    .HasConstraintName("INVENTARIO_TIENDA_FK");
            });

            modelBuilder.Entity<Mantenimiento>(entity =>
            {
                entity.HasKey(e => e.IdMantenimiento)
                    .HasName("MANTENIMIENTO_PK");

                entity.ToTable("MANTENIMIENTO");

                entity.Property(e => e.IdMantenimiento)
                    .HasPrecision(10)
                    .HasColumnName("ID_MANTENIMIENTO");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("DESCRIPCION");

                entity.Property(e => e.Estado)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("ESTADO");

                entity.Property(e => e.IdCliente)
                    .HasPrecision(10)
                    .HasColumnName("ID_CLIENTE");

                entity.Property(e => e.IdTienda)
                    .HasPrecision(3)
                    .HasColumnName("ID_TIENDA");

                entity.Property(e => e.IdVehiculo)
                    .HasPrecision(10)
                    .HasColumnName("ID_VEHICULO");

                entity.Property(e => e.Presupuesto)
                    .HasPrecision(7)
                    .HasColumnName("PRESUPUESTO");

                entity.Property(e => e.UrlPictures)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("URL_PICTURES");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Mantenimientos)
                    .HasForeignKey(d => d.IdCliente)
                    .HasConstraintName("MANTENIMIENTO_CLIENTE_FK");

                entity.HasOne(d => d.IdTiendaNavigation)
                    .WithMany(p => p.Mantenimientos)
                    .HasForeignKey(d => d.IdTienda)
                    .HasConstraintName("MANTENIMIENTO_TIENDA_FK");

                entity.HasOne(d => d.IdVehiculoNavigation)
                    .WithMany(p => p.Mantenimientos)
                    .HasForeignKey(d => d.IdVehiculo)
                    .HasConstraintName("MANTENIMIENTO_VEHICULO_FK");
            });

            modelBuilder.Entity<MantenimientoProducto>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("MANTENIMIENTO_PRODUCTO");

                entity.Property(e => e.Cantidad)
                    .HasPrecision(3)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CANTIDAD");

                entity.Property(e => e.IdMantenimiento)
                    .HasPrecision(10)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID_MANTENIMIENTO");

                entity.Property(e => e.IdProducto)
                    .HasPrecision(6)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID_PRODUCTO");

                entity.HasOne(d => d.IdMantenimientoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdMantenimiento)
                    .HasConstraintName("MANTENIMIENTO_PRODUCTO_MANTENIMIENTO_FK");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdProducto)
                    .HasConstraintName("MANTENIMIENTO_PRODUCTO_PRODUCTO_FK");
            });

            modelBuilder.Entity<MantenimientoServicio>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("MANTENIMIENTO_SERVICIO");

                entity.Property(e => e.IdMantenimiento)
                    .HasPrecision(10)
                    .HasColumnName("ID_MANTENIMIENTO");

                entity.Property(e => e.IdMecanico)
                    .HasPrecision(10)
                    .HasColumnName("ID_MECANICO");

                entity.Property(e => e.IdServicio)
                    .HasPrecision(6)
                    .HasColumnName("ID_SERVICIO");

                entity.Property(e => e.ValorMnoObra)
                    .HasPrecision(7)
                    .HasColumnName("VALOR_MNO_OBRA");

                entity.HasOne(d => d.IdMantenimientoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdMantenimiento)
                    .HasConstraintName("MANTENIMIENTO_SERVICIO_MANTENIMIENTO_FK");

                entity.HasOne(d => d.IdMecanicoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdMecanico)
                    .HasConstraintName("MANTENIMIENTO_SERVICIO_MECANICO_FK");

                entity.HasOne(d => d.IdServicioNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdServicio)
                    .HasConstraintName("MANTENIMIENTO_SERVICIO_SERVICIO_FK");
            });

            modelBuilder.Entity<Mecanico>(entity =>
            {
                entity.HasKey(e => e.IdMecanico)
                    .HasName("MECANICO_PK");

                entity.ToTable("MECANICO");

                entity.Property(e => e.IdMecanico)
                    .HasPrecision(10)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_MECANICO");

                entity.Property(e => e.Celular)
                    .HasPrecision(12)
                    .HasColumnName("CELULAR");

                entity.Property(e => e.Correo)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("CORREO");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("DIRECCION");

                entity.Property(e => e.Documento)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("DOCUMENTO");

                entity.Property(e => e.Estado)
                    .HasPrecision(1)
                    .HasColumnName("ESTADO");

                entity.Property(e => e.IdBarrio)
                    .HasPrecision(10)
                    .HasColumnName("ID_BARRIO");

                entity.Property(e => e.IdCiudad)
                    .HasPrecision(5)
                    .HasColumnName("ID_CIUDAD");

                entity.Property(e => e.IdDepartamento)
                    .HasPrecision(2)
                    .HasColumnName("ID_DEPARTAMENTO");

                entity.Property(e => e.IdTienda)
                    .HasPrecision(3)
                    .HasColumnName("ID_TIENDA");

                entity.Property(e => e.IdTipoDoc)
                    .HasPrecision(2)
                    .HasColumnName("ID_TIPO_DOC");

                entity.Property(e => e.PApellido)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("P_APELLIDO");

                entity.Property(e => e.PNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("P_NOMBRE");

                entity.Property(e => e.SApellido)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("S_APELLIDO");

                entity.Property(e => e.SNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("S_NOMBRE");

                entity.HasOne(d => d.IdBarrioNavigation)
                    .WithMany(p => p.Mecanicos)
                    .HasForeignKey(d => d.IdBarrio)
                    .HasConstraintName("MECANICO_BARRIO_FK");

                entity.HasOne(d => d.IdCiudadNavigation)
                    .WithMany(p => p.Mecanicos)
                    .HasForeignKey(d => d.IdCiudad)
                    .HasConstraintName("MECANICO_CIUDAD_FK");

                entity.HasOne(d => d.IdDepartamentoNavigation)
                    .WithMany(p => p.Mecanicos)
                    .HasForeignKey(d => d.IdDepartamento)
                    .HasConstraintName("MECANICO_DEPARTAMENTO_FK");

                entity.HasOne(d => d.IdTiendaNavigation)
                    .WithMany(p => p.Mecanicos)
                    .HasForeignKey(d => d.IdTienda)
                    .HasConstraintName("MECANICO_TIENDA_FK");

                entity.HasOne(d => d.IdTipoDocNavigation)
                    .WithMany(p => p.Mecanicos)
                    .HasForeignKey(d => d.IdTipoDoc)
                    .HasConstraintName("MECANICO_TIPO_DOC_FK");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.IdProducto)
                    .HasName("PRODUCTO_PK");

                entity.ToTable("PRODUCTO");

                entity.Property(e => e.IdProducto)
                    .HasPrecision(6)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_PRODUCTO");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("DESCRIPCION");

                entity.Property(e => e.Precio)
                    .HasPrecision(8)
                    .HasColumnName("PRECIO");
            });

            modelBuilder.Entity<Servicio>(entity =>
            {
                entity.HasKey(e => e.IdServicio)
                    .HasName("SERVICIO_PK");

                entity.ToTable("SERVICIO");

                entity.Property(e => e.IdServicio)
                    .HasPrecision(6)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_SERVICIO");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("DESCRIPCION");

                entity.Property(e => e.ValorMan)
                    .HasPrecision(7)
                    .HasColumnName("VALOR_MAN");

                entity.Property(e => e.ValorMin)
                    .HasPrecision(7)
                    .HasColumnName("VALOR_MIN");
            });

            modelBuilder.Entity<Tiendum>(entity =>
            {
                entity.HasKey(e => e.IdTienda)
                    .HasName("TIENDA_PK");

                entity.ToTable("TIENDA");

                entity.Property(e => e.IdTienda)
                    .HasPrecision(3)
                    .HasColumnName("ID_TIENDA");

                entity.Property(e => e.IdBarrio)
                    .HasPrecision(10)
                    .HasColumnName("ID_BARRIO");

                entity.Property(e => e.IdCiudad)
                    .HasPrecision(5)
                    .HasColumnName("ID_CIUDAD");

                entity.Property(e => e.IdDepartamento)
                    .HasPrecision(2)
                    .HasColumnName("ID_DEPARTAMENTO");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("NOMBRE");

                entity.HasOne(d => d.IdBarrioNavigation)
                    .WithMany(p => p.Tienda)
                    .HasForeignKey(d => d.IdBarrio)
                    .HasConstraintName("TIENDA_BARRIO_FK");

                entity.HasOne(d => d.IdCiudadNavigation)
                    .WithMany(p => p.Tienda)
                    .HasForeignKey(d => d.IdCiudad)
                    .HasConstraintName("TIENDA_CIUDAD_FK");

                entity.HasOne(d => d.IdDepartamentoNavigation)
                    .WithMany(p => p.Tienda)
                    .HasForeignKey(d => d.IdDepartamento)
                    .HasConstraintName("TIENDA_DEPARTAMENTO_FK");
            });

            modelBuilder.Entity<TipoDoc>(entity =>
            {
                entity.HasKey(e => e.IdTipoDoc)
                    .HasName("TIPO_DOC_PK");

                entity.ToTable("TIPO_DOC");

                entity.Property(e => e.IdTipoDoc)
                    .HasPrecision(2)
                    .HasColumnName("ID_TIPO_DOC");

                entity.Property(e => e.DescTipoDoc)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("DESC_TIPO_DOC");

                entity.Property(e => e.FechaCrea)
                    .HasColumnType("DATE")
                    .HasColumnName("FECHA_CREA");

                entity.Property(e => e.TipoDoc1)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .HasColumnName("TIPO_DOC");
            });

            modelBuilder.Entity<Vehiculo>(entity =>
            {
                entity.HasKey(e => e.IdVehiculo)
                    .HasName("VEHICULO_PK");

                entity.ToTable("VEHICULO");

                entity.Property(e => e.IdVehiculo)
                    .HasPrecision(10)
                    .HasColumnName("ID_VEHICULO");

                entity.Property(e => e.Color)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("COLOR");

                entity.Property(e => e.FechaRegistro)
                    .HasColumnType("DATE")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("FECHA_REGISTRO");

                entity.Property(e => e.IdCliente)
                    .HasPrecision(10)
                    .HasColumnName("ID_CLIENTE");

                entity.Property(e => e.Marca)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("MARCA");

                entity.Property(e => e.Modelo)
                    .HasPrecision(4)
                    .HasColumnName("MODELO");

                entity.Property(e => e.Placa)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("PLACA");

                entity.Property(e => e.StatusVehiculo)
                    .HasPrecision(1)
                    .HasColumnName("STATUS_VEHICULO");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Vehiculos)
                    .HasForeignKey(d => d.IdCliente)
                    .HasConstraintName("VEHICULO_CLIENTE_FK");
            });

            modelBuilder.HasSequence("CLIENTE_SEQ");

            modelBuilder.HasSequence("MANTENIMIENTO_SEQ");

            modelBuilder.HasSequence("VEHICULO_SEQ");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
