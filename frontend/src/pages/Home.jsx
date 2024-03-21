import React from "react";
import Login from "../components/Login";
import RegisterClientForm from "../components/RegisterClientForm";
import ModalContent from "../containers/ModalContent";
//Context - manejo de variables entre componentes
import ProjectContext from "../context/ProjectContext";
import useLocationState from "../hooks/useLocationStage";
const Home = () => {
  const locationState = useLocationState();
  return (
    <div className="login">
      <h3 className="text_welcome">
        Bienvenid@, aquí podrá solicitar servicios de mantenimiento para su
        vehículo
      </h3>
      <Login />
      <ProjectContext.Provider value={locationState}>
        <ModalContent
          id="register-modal"
          contents={<RegisterClientForm registro={true} />}
          title="Formulario de registro"
        />
      </ProjectContext.Provider>
    </div>
  );
};

export default Home;
