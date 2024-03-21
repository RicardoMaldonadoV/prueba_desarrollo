//Para peticiones a la Api
import Axios from "axios";
//HTTP Request
let BaseUrl = "https://localhost:7229/api";
function locationRequest() {
  //Gets location
  async function departamento() {
    return await Axios.get(BaseUrl + "/Location/Departamentos");
  }
  async function ciudad(id_departamento) {
    return await Axios.get(
      BaseUrl + "/Location/CiudadesPorDpto?id_departamento=" + id_departamento
    );
  }

  async function barrio(id_ciudad) {
    return await Axios.get(
      BaseUrl + "/Location/BarriosPorCiudad?id_ciudad=" + id_ciudad
    );
  }

  async function tienda() {
    return await Axios.get(
      BaseUrl + "/Location/Tiendas"
    );
  }

  return { departamento, ciudad, barrio, tienda };
}

export default locationRequest;
