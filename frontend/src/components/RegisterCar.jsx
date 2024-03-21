import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
//Para peticiones a la Api
import vehiculoRequest from "../requests/vehiculoRequest";
//Import CSS
import "@styles/form.css";
import SelectItemForm from "./SelectItemForm";
//Coolkies - info cliente
import Cookies from "universal-cookie";
const cookies = new Cookies();

const RegisterCar = () => {
  const user = cookies.get("o_cliente");
  //Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { crearVehiculo } = vehiculoRequest();
  const crear_vehiculo = (data, e) => {
    let create = null;
    create = crearVehiculo(
      data.placa,
      data.marca,
      data.modelo,
      data.color,
      user.idCliente
    );
    if (create === true) {
      alert("Vehiculo registrado con éxito");
      e.target.reset();
      document.getElementById("addCar-modal").style.display = "none";
      window.location.href = "/menu/";
    } else if (create === false)
      alert("No fue posible realizar el registro, intentelo nuevamente");
  };
  const onSubmit = (data, e) => {
    crear_vehiculo(data, e);
  };
  return (
    <div>
      <form
        id="CarDataForm"
        className="modal-body"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Placa */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Placa:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="Placa"
              type="text"
              className="form-control"
              name="placa"
              {...register("placa", {
                required: {
                  value: true,
                  message: "Placa es requerido",
                },
                minLength: {
                  value: 5,
                  message: "Mínimo 5 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.placa?.message}
            </span>
          </div>

          {/* marca */}
          <div className="col-sm-6">
            <label>Marca:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="marca"
              type="text"
              className="form-control"
              name="marca"
              {...register("marca", {
                required: {
                  value: true,
                  message: "Marca es requerido",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo 2 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.marca?.message}
            </span>
          </div>

          {/* modelo */}
          <div className="col-sm-6">
            <label>Modelo:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="modelo"
              type="number"
              className="form-control"
              name="modelo"
              {...register("modelo", {
                required: {
                  value: true,
                  message: "Modelo es requerido",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo 2 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.modelo?.message}
            </span>
          </div>

          {/* color */}
          <div className="col-sm-6">
            <label>Color:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="color"
              type="text"
              className="form-control"
              name="color"
              {...register("color", {
                required: {
                  value: true,
                  message: "Color es requerido",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo 3 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.color?.message}
            </span>
          </div>
          {/* button  */}
          <div className="row justify-content-around button-group">
            <div className="col-sm-6 form_combo_btn_content">
              <button
                type="summit"
                className="btn btn-primary item_combo_btn"
                form="CarDataForm"
              >
                Registrar vehículo
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterCar;
