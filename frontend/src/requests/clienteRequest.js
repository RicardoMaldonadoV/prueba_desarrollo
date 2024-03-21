//Para peticiones a la Api
import Axios from "axios";
//HTTP Request
let BaseUrl = "https://localhost:7229/api/Cliente";
function clienteRequest() {
  //Metodo GET obtener tipos de documentos
  async function tipo_doc() {
    return await Axios.get(BaseUrl + "/tipo_doc");
  }
  //Metodo GET valida correo y documento, retorna los datos
  async function validaCliente(mail, doc) {
    return await Axios.get(
      BaseUrl + "/porDocMailCliente?doc=" + doc + "&mail=" + mail
    );
  }
  //Metodo POS de creación de nuevo cliente
  const crearCliente = (
    p_nombre,
    s_nombre,
    p_apellido,
    s_apellido,
    id_tipo_doc,
    documento,
    celular,
    correo,
    direccion,
    id_departamento,
    id_ciudad,
    id_barrio
  ) => {
    let rta = false;
    Axios.post(BaseUrl, {
      idCliente: 0,
      pNombre: p_nombre,
      sNombre: s_nombre,
      pApellido: p_apellido,
      sApellido: s_apellido,
      idTipoDoc: id_tipo_doc,
      documento: documento,
      celular: celular,
      correo: correo,
      direccion: direccion,
      idDepartamento: id_departamento,
      idCiudad: id_ciudad,
      idBarrio: id_barrio,
    })
      .then((rta = true))
      .catch((err) => console.error(err));

    return rta;
  };

  const actualizarCliente = (
    id_cliente,
    p_nombre,
    s_nombre,
    p_apellido,
    s_apellido,
    id_tipo_doc,
    documento,
    celular,
    correo,
    direccion,
    id_departamento,
    id_ciudad,
    id_barrio) => {
      let rta = false;
      Axios.put(BaseUrl, {
        idCliente: id_cliente,
        pNombre: p_nombre,
        sNombre: s_nombre,
        pApellido: p_apellido,
        sApellido: s_apellido,
        idTipoDoc: id_tipo_doc,
        documento: documento,
        celular: celular,
        correo: correo,
        direccion: direccion,
        idDepartamento: id_departamento,
        idCiudad: id_ciudad,
        idBarrio: id_barrio,
      })
        .then((rta = true))
        .catch((err) => console.error(err));
  
      return rta;
    };

    const eliminarCliente = (id) => {
      Axios.delete(
        BaseUrl + "/" + id
      );
      
    };

  return { tipo_doc, validaCliente, crearCliente , actualizarCliente , eliminarCliente};
}

export default clienteRequest;