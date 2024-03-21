//Para peticiones a la Api
import Axios from "axios";
//HTTP Request
let BaseUrl = "https://localhost:7229/api/Mantenimiento";
function MantenimientoRequest() {
  //Metodo GET mantenimientos por cc
  async function obtenerMantenimientos(doc) {
    return await Axios.get(BaseUrl + "/porDocCliente?doc=" + doc);
  }
  //Metodo POS de creación de nuevo cliente
  const crearMantenimientos = (
    idTienda,
    idVehiculo,
    idCliente,
    descripcion,
    presupuesto
  ) => {
    let rta = false;
    Axios.post(BaseUrl, {
  idMantenimiento: 0,
  idTienda: idTienda,
  estado: "Creado",
  idVehiculo: idVehiculo,
  idCliente: idCliente,
  descripcion: descripcion,
  presupuesto: presupuesto,
  urlPictures: "No hay foto"
    })
      .then((rta = true))
      .catch((err) => console.error(err));

    return rta;
  };

  return { crearMantenimientos, obtenerMantenimientos };
}

export default MantenimientoRequest;
