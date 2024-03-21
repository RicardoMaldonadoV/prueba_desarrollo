//Para peticiones a la Api
import Axios from "axios";
//HTTP Request
let BaseUrl = "https://localhost:7229/api/Vehiculo";
function vehiculoRequest() {
  //Metodo GET mantenimientos por cc
  async function obtenerVehiculo(doc) {
    return await Axios.get(BaseUrl + "/porDocCliente?doc=" + doc);
  }
  //Metodo POS de creación de nuevo cliente
  const crearVehiculo = (placa, marca, modelo, color, idCliente) => {
    let rta = false;
    Axios.post(BaseUrl, {
      idVehiculo: 0,
      placa: placa,
      marca: marca,
      modelo: modelo,
      color: color,
      idCliente: idCliente,
      statusVehiculo: 0,
      fechaRegistro: null,
    })
      .then((rta = true))
      .catch((err) => console.error(err));

    return rta;
  };

  return { crearVehiculo, obtenerVehiculo };
}

export default vehiculoRequest;
