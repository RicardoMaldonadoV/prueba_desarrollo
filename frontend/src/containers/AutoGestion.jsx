import React from "react";
import RegisterClientForm from "../components/RegisterClientForm";
import ModalContent from "../containers/ModalContent";
//Context - manejo de variables entre componentes
import ProjectContext from "../context/ProjectContext";
import useLocationState from "../hooks/useLocationStage";
import clienteRequest from "../requests/clienteRequest";
//Import CSS
import "@styles/form.css";
//Coolkies - info cliente
import Cookies from "universal-cookie";
import RegisterCar from "../components/RegisterCar";
const cookies = new Cookies();

const AutoGestion = () => {
  const user = cookies.get("o_cliente");
  const locationState = useLocationState();
  //Instanció request
  const { eliminarCliente } = clienteRequest();
  //Metodo para activar el Modal de Registro
  const showmodalRegister = () => {
    document.getElementById("register-modal").style.display = "block";
  };
  const showmodalAdCarr = () => {
    document.getElementById("addCar-modal").style.display = "block";
  };
  //Cierro modal
  window.onclick = function (event) {
    if (event.target == document.getElementById("register-modal")) {
      document.getElementById("register-modal").style.display = "none";
    }
    if (event.target == document.getElementById("addCar-modal")) {
      document.getElementById("addCar-modal").style.display = "none";
    }
  };
  //Dar de baja
  const borrar = () => {
    let rta = confirm(
      "Está seguro de querer darse de baja? esto borrará todo su registro"
    );
    if (rta == true) {
      eliminarCliente(user.idCliente);
      cookies.remove("o_cliente", { path: "/" });
      window.location.href = "/";
    }
  };
  return (
    <div className="justify-content-around button-group">
      <div className=" form_combo_btn_content">
        {/* Buttons */}
        <button
          type="button"
          className="btn btn-primary btn-bg btn-aug"
          onClick={showmodalRegister}
        >
          Actualizar datos
        </button>
        <button
          type="button"
          className="btn btn-primary btn-bg btn-aug"
          onClick={showmodalAdCarr}
        >
          Agregar vehículo
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-bg btn-aug"
          onClick={() => {
            let rta = confirm("Está seguro de desea salir de la aplicación ?");
            if (rta == true) {
              cookies.remove("o_cliente", { path: "/" });
              window.location.href = "/";
            }
          }}
        >
          Salir
        </button>
        <button
          type="button"
          className="btn btn-danger btn-bg btn-aug"
          onClick={borrar}
        >
          Dar de baja
        </button>
      </div>
      <ProjectContext.Provider value={locationState}>
        <ModalContent
          id="register-modal"
          contents={<RegisterClientForm register={false} />}
          title="Formulario de actualización de datos"
        />
      </ProjectContext.Provider>
      <ModalContent
        id="addCar-modal"
        contents={<RegisterCar />}
        title="Registro de vehículo"
      />
    </div>
  );
};

export default AutoGestion;
