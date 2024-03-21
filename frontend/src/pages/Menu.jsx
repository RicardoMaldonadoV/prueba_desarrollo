import React, { useEffect,useState } from "react";
//Coolkies - info cliente
import Cookies from "universal-cookie";
const cookies = new Cookies();
//CSS
import "@styles/home.css";
import HomeModule from "../containers/HomeModule";
import RegisterMantenimient from "../components/RegisterMantenimient";
import ShowMantenimient from "../containers/ShowMantenimient";
import AutoGestion from "../containers/AutoGestion";

const Menu = () => {
    const [username, setUsername] = useState("");
    const user = cookies.get("o_cliente");
  useEffect(() => {
    if (!cookies.get("o_cliente")) {
        window.location.href = "/";
    }else{
        setUsername(user.pNombre);
    }
  }, []);
  
  //idCliente,pNombre,sNombre,pApellido,sApellido,idTipoDoc,documento,celular,correo,direccion,idBarrio,idCiudad,idDepartamento
  return (
    <div className="home row" id="main-menu">
      <h3 className="text_welcome">
        Hola 👋, <span className="home_name_bold">{username}</span>, estás
        list@ para pedir un servicio de mantenimiento?
      </h3>
      <div className="col-sm-4 home_module">
        <HomeModule
          title="Solicitar servicio"
          moduleType={<RegisterMantenimient />}
        ></HomeModule>
      </div>
      <div className="col-sm-4 home_module">
        <HomeModule
          title="Mantenimientos solicitados"
          moduleType={<ShowMantenimient />}
        ></HomeModule>
      </div>
      <div className="col-sm-4 home_module">
        <HomeModule
          title="Autogestión de datos"
          moduleType={<AutoGestion />}
        ></HomeModule>
      </div>
    </div>
  );
};

export default Menu;
