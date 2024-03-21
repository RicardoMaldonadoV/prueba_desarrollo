import React from "react";

const CloseModalButton = ({id}) => {
  //Metodo para cerrar el modal
  const closeModal = () => {
    document.getElementById(id).style.display = "none";
  };
  return (
    <div>
      <button type="button" className="btn-close" onClick={closeModal}></button>
    </div>
  );
};

export default CloseModalButton;
