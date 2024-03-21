import React from "react";
import CloseModalButton from "../components/CloseModalButton";
//Import CSS
import "@styles/modal.css";
//Renderizo un modal dependiendo de la data recibida
const ModalContent = ({ id, contents, title }) => {
  return (
    <div id={id} className="modal">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header-center">
            <CloseModalButton id={id}/>
            <br />
            <h4 className="modal-title text-center">{title}</h4>
            <br />
          </div>
          {contents}
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
