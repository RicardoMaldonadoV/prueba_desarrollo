import React, { useEffect, useState , useContext } from "react";
import clienteRequest from "../requests/clienteRequest";
import locationRequest from "../requests/locationRequest";
//Contexto location
import ProjectContext from "../context/ProjectContext";

const SelectItemForm = ({ metodo_api }) => {
  //Renderizo el componente de acuerdo al metodo api recibido
  const { tipo_doc } = clienteRequest();
  const { departamento, ciudad } = locationRequest();
    //Contexto de los datos dinamicos
    const {
        setL_ciudades,
        setL_barrios,
        setId_departamento,
        setId_tipo_doc,
        setId_ciudad,
        setId_barrio
      } = useContext(ProjectContext);
  //Creo un estado para guardar el vector con los resultados
  const [res, setRes] = useState([]);
  //Obtengo la información dependiendo el metodo api recibido
  const get_data = async () => {
    switch (metodo_api) {
      case "tipo_doc":
        tipo_doc()
          .then((response) => {
            return response.data;
          })
          .then((response) => {
            //response es un array de objetos por lo que mapeo el array para obtener la lista
            setRes(response.map((item) => Object.values(item)));
          })
          .catch((error) => {
            console.log(
              `-> /components/SelectItemForm - tipo_doc - Error: ${error}`
            );
          });
        break;
      case "departamento":
        departamento()
          .then((response) => {
            return response.data;
          })
          .then((response) => {
            //response es un array de objetos por lo que mapeo el array para obtener la lista
            setRes(response.map((item) => Object.values(item)));
          })
          .catch((error) => {
            console.log(
              `-> /components/SelectItemForm - departamento - Error: ${error}`
            );
          });
        break;
      default:
        break;
    }
  };
  const get_ciudades = async (event) => {
    ciudad(event.currentTarget.value)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        let ciudad_list = response.map((item) => Object.values(item))
        setL_ciudades(ciudad_list);
        setL_barrios([]);
      })
      .catch((err) => {
        console.log(
          `-> /components/SelectItemForm - ciudades - Error: ${err}`
        );
      });
  };

  useEffect(() => {
    get_data();
  }, []);
  return (
    <>
      <select
        type="text"
        className="form-select"
        name="res"
        onChange={(event) => {
          if (metodo_api == "departamento") {
            setL_barrios([]);
            setL_ciudades([]);
            setId_ciudad("");
            setId_barrio("");
            setId_departamento(event.currentTarget.value);
            get_ciudades(event);      
          }
          if (metodo_api == "tipo_doc") {
            setId_tipo_doc(event.currentTarget.value);
          }
        }}
        required
      >
        <option></option>
        {res.map((res, index) => {
          return (
            <option key={index} value={res[0]}>
              {metodo_api == "tipo_doc" ? res[2] : res[1]}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectItemForm;
