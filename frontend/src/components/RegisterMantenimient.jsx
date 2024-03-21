import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//Para peticiones a la Api
import locationRequest from "../requests/locationRequest";
import mantenimientoRequest from "../requests/mantenimientoRequest";
import vehiculoRequest from "../requests/vehiculoRequest";
//Import CSS
import "@styles/form.css";
//Coolkies - info cliente
import Cookies from "universal-cookie";
const cookies = new Cookies();

const RegisterMantenimient = () => {
  const user = cookies.get("o_cliente");
  //idCliente,pNombre,sNombre,pApellido,sApellido,idTipoDoc,documento,celular,correo,direccion,idBarrio,idCiudad,idDepartamento
  const [l_vehiculos, setL_vehiculos] = useState([]);
  const [l_tiendas, setL_tiendas] = useState([]);

  //Inicializo vehiculos del cliente y mantenimientos
  useEffect(() => {
    get_tiendas();
    get_vehiculos();
  }, []);
  //Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //Instanció request
  const { crearMantenimientos } = mantenimientoRequest();
  const { tienda } = locationRequest();
  const { obtenerVehiculo } = vehiculoRequest();
  //Metodo para obtener vehiculos
  const get_vehiculos = async () => {
    obtenerVehiculo(user.documento)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        //response es un array de objetos por lo que mapeo el array para obtener la lista
        setL_vehiculos(response.map((item) => Object.values(item)));
      })
      .catch((error) => {
        console.log(
          `-> /components/RegisterMantenimiento - vehiculo - Error: ${error}`
        );
      });
  };
  //Metodo para obtener tiendas
  const get_tiendas = async () => {
    tienda()
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        //response es un array de objetos por lo que mapeo el array para obtener la lista
        setL_tiendas(response.map((item) => Object.values(item)));
      })
      .catch((error) => {
        console.log(
          `-> /components/RegisterMantenimiento - tienda - Error: ${error}`
        );
      });
  };
  //Metodo summit del form agregar mantenimiento
  const onSubmit = (data, e) => {
    //Var que valida si se crea o no el cliente
    let create = null;
    console.log(data);
    create = crearMantenimientos(
      data.id_tienda,
      data.id_vehiculo,
      user.idCliente,
      data.descripcion,
      data.presupuesto
    );
    if (create === true) {
      alert("Solicitud de mantenimiento creada con éxito");
      window.location.href = "/menu/";
    } else if (create === false)
      alert("No fue posible realizar el registro, intentelo nuevamente");
  };
  return (
    <div>
      <form
        id="MantenDataForm"
        className="modal-body"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Tienda */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-4">
            <label htmlFor="id_tienda">Tienda:</label>
          </div>
          <div className="col-sm-8">
            <select
              type="text"
              className="form-select"
              name="id_tienda"
              defaultValue={0}
              {...register("id_tienda", {
                required: {
                  value: true,
                  message: "Tienda es requerido",
                },
              })}
            >
              <option></option>
              {l_tiendas.map((tienda, index) => {
                return (
                  <option key={index} value={tienda[0]}>
                    {tienda[1]}
                  </option>
                );
              })}
            </select>
            <span className="text-danger text-small d-block mb-2">
              {errors?.id_tienda?.message}
            </span>
          </div>
        </div>

        {/* Vehiculo */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-4">
            <label htmlFor="id_vehiculo">Vehiculo:</label>
          </div>
          <div className="col-sm-8">
            <select
              type="text"
              className="form-select"
              name="id_vehiculo"
              defaultValue={0}
              {...register("id_vehiculo", {
                required: {
                  value: true,
                  message: "Vehiculo es requerido",
                },
              })}
            >
              <option></option>
              {l_vehiculos.map((carro, index) => {
                return (
                  <option key={index} value={carro[0]}>
                    {carro[2] + " - Placa: " + carro[1]}
                  </option>
                );
              })}
            </select>
            <span className="text-danger text-small d-block mb-2">
              {errors?.id_vehiculo?.message}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label htmlFor="descriptionIdeaTextarea" className="form-label">
            Descripción detallada de la novedad:
          </label>
          <textarea
            className="form-control"
            name="descripcion"
            rows="3"
            {...register("descripcion", {
              required: {
                value: true,
                message: "Descripción es requerido",
              },
              maxLength: {
                value: 180,
                message: "Máximo 180 carácteres",
              },
            })}
          ></textarea>
          <span className="text-danger text-small d-block mb-2">
            {errors?.descripcion?.message}
          </span>
        </div>

        {/* presupuesto */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-4">
            <label>Presupuesto:</label>
          </div>
          <div className="col-sm-8">
            <input
              placeholder="$"
              type="number"
              className="form-control"
              name="presupuesto"
              {...register("presupuesto")}
            />
          </div>
        </div>

        {/* botón */}

        <div className="row justify-content-around button-group">
          <div className="col-sm-8 form_combo_btn_content">
            <button
              type="submit"
              className="btn btn-primary col-sm-6 btn-solicitar"
            >
              Solicitar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterMantenimient;
