import { useState } from "react";
const useLocationStage = () => {
    //States para almacenar los datos de la dirección
  const [id_departamento, setId_departamento] = useState("");
  const [id_ciudad, setId_ciudad] = useState("");
  const [id_barrio, setId_barrio] = useState("");
  const [l_ciudades, setL_ciudades] = useState([]);
  const [l_barrios, setL_barrios] = useState([]);
  const [id_tipo_doc, setId_tipo_doc] = useState("");
  
  return {
    id_departamento,
    id_ciudad,
    id_barrio,
    l_ciudades,  
    l_barrios,
    id_tipo_doc,
    setId_tipo_doc,
    setL_barrios,
    setL_ciudades,
    setId_barrio,
    setId_departamento,
    setId_ciudad
    };
};

export default useLocationStage;