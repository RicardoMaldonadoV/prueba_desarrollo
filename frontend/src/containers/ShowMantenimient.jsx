import React, { useEffect, useState } from "react";
import mantenimientoRequest from "../requests/mantenimientoRequest";
//Coolkies - info cliente
import Cookies from "universal-cookie";
import ListMantenimient from "./ListMantenimient";
const cookies = new Cookies();

const ShowMantenimient = () => {
  const user = cookies.get("o_cliente");
  const [l_mantenimientos, setL_mantenimientos] = useState([]);
  const key = [];

  //Inicializo vehiculos del cliente y mantenimientos
  useEffect(() => {get_mantenimiento()}, []);
  //Instanció request
  const { obtenerMantenimientos } = mantenimientoRequest();
  //Metodo para obtener mantenimientos
  const get_mantenimiento = async () => {
    obtenerMantenimientos(user.documento)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        //response es un array de objetos por lo que mapeo el array para obtener la lista
        setL_mantenimientos(response.map(item => Object.values(item)));
      })
      .catch((error) => {
        console.log(`-> /components/RegisterMantenimiento - mantenimiento - Error: ${error}`);
      });
  };
  return <div>{<ListMantenimient mantenimientos={l_mantenimientos}/>}</div>;
};

export default ShowMantenimient;