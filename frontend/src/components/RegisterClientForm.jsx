import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
//Para peticiones a la Api
import clienteRequest from "../requests/clienteRequest";
import locationRequest from "../requests/locationRequest";
//Import CSS
import "@styles/form.css";
import SelectItemForm from "./SelectItemForm";
//Contexto location
import ProjectContext from "../context/ProjectContext";
//Coolkies - info cliente
import Cookies from "universal-cookie";
const cookies = new Cookies();

const RegisterClientForm = (props) => {
  const [req, seReq] = useState({
    required: {
      value: true,
      message: "El Nro de documento es requerido",
    },
    minLength: {
      value: 4,
      message: "Mínimo 4 carácteres",
    },
  });
  const user = cookies.get("o_cliente");
  //Inicializo los datos si se hace el llamado al componente desde el modulo de actualización y no desde el de registro
  useEffect(() => {
    if (props.register == false) {
      //idCliente,pNombre,sNombre,pApellido,sApellido,idTipoDoc,documento,celular,correo,direccion,idBarrio,idCiudad,idDepartamento
      document.getElementById("nombre1").value = user.pNombre;
      document.getElementById("nombre2").value = user.sNombre;
      document.getElementById("apellido1").value = user.pApellido;
      document.getElementById("apellido2").value = user.sApellido;
      document.getElementById("doc").value = user.documento;
      document.getElementById("cel").value = user.celular;
      document.getElementById("corr").value = user.correo;
      document.getElementById("corr2").value = user.correo;
      document.getElementById("dir").value = user.direccion;
      document.getElementById("corr").disabled = true;
      document.getElementById("corr2").disabled = true;
      document.getElementById("doc").disabled = true;
      seReq({
        required: {
          value: false,
          message: "El Nro de documento es requerido",
        },
        minLength: {
          value: 4,
          message: "Mínimo 4 carácteres",
        },
      });
    }
  }, []);
  //Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //Contexto de los datos dinamicos
  const {
    id_departamento,
    id_ciudad,
    id_barrio,
    id_tipo_doc,
    l_barrios,
    l_ciudades,
    setL_barrios,
    setId_ciudad,
    setId_barrio,
  } = useContext(ProjectContext);
  //Instanció request
  const { validaCliente, crearCliente, actualizarCliente } = clienteRequest();
  const { barrio } = locationRequest();

  //Metodo para obtener barrios
  const get_barrios = async (event) => {
    if (event.currentTarget.value != "")
      barrio(event.currentTarget.value)
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          //response es un array de objetos por lo que mapeo el array para obtener la lista
          setL_barrios(response.map((item) => Object.values(item)));
        })
        .catch((error) => {
          console.log(
            `-> /components/SelectItemForm - barrio - Error: ${error}`
          );
        });
  };

  const crear_cliente = (data, e) => {
    let create = null;
    if (data.correo == data.correo2) {
      create = crearCliente(
        data.p_nombre,
        data.s_nombre,
        data.p_apellido,
        data.s_apellido,
        id_tipo_doc,
        data.documento,
        data.celular,
        data.correo,
        data.direccion,
        id_departamento,
        id_ciudad,
        id_barrio
      );
      if (create === true) {
        alert("Cliente creado con éxito");
        e.target.reset();
        document.getElementById("register-modal").style.display = "none";
      } else if (create === false)
        alert("No fue posible realizar el registro, intentelo nuevamente");
    } else {
      alert("El correo no coinciden");
    }
  };

  const actualizar_cliente = (data) => {
    let update = null;
    update = actualizarCliente(
      user.idCliente,
      data.p_nombre,
      data.s_nombre,
      data.p_apellido,
      data.s_apellido,
      id_tipo_doc,
      user.documento,
      data.celular,
      user.correo,
      data.direccion,
      id_departamento,
      id_ciudad,
      id_barrio
    );
    if (update === true) {
      alert("Cliente actualizado con éxito");
      actualizar_usuario(user.correo, user.documento);
    } else if (update === false)
      alert("No fue posible realizar la actualización, intentelo nuevamente");
  };
  const actualizar_usuario = (mail, doc) => {
    validaCliente(mail, doc)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        const lengthResponse = Object.keys(response).length;
        if (lengthResponse > 0) {
          cookies.set("o_cliente", response, { path: "/" });
          window.location.href = "/menu/";
        } else
          throw new SyntaxError(
            "No fue posible actualizar la información en el panel"
          );
      })
      .catch((err) => {
        console.log(err);
        alert("No fue posible actualizar la información en el panel" + err);
      });
  };
  //Metodo summit del form agregar cliente
  const onSubmit = (data, e) => {
    props.registro == true
      ? crear_cliente(data, e)
      : actualizar_cliente(data, e);
  };
  return (
    <div>
      <form
        id="ClientDataForm"
        className="modal-body"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Nombres y Apellidos */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Primer nombre:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="PrimerNombre"
              type="text"
              className="form-control"
              id="nombre1"
              name="p_nombre"
              {...register("p_nombre", {
                required: {
                  value: true,
                  message: "Primer nombre es requerido",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo 2 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.p_nombre?.message}
            </span>
          </div>
        </div>
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Segundo nombre:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="SegundoNombre"
              type="text"
              className="form-control"
              id="nombre2"
              name="s_nombre"
              {...register("s_nombre")}
            />
          </div>
        </div>
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Primer apellido:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="PrimerApellido"
              type="text"
              className="form-control"
              id="apellido1"
              name="p_apellido"
              {...register("p_apellido", {
                required: {
                  value: true,
                  message: "Primer apellido es requerido",
                },
                minLength: {
                  value: 2,
                  message: "Mínimo 2 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.p_apellido?.message}
            </span>
          </div>
        </div>
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Segundo apellido:</label>
          </div>
          <div className="col-sm-6">
            <input
              placeholder="SegundoApellido"
              type="text"
              className="form-control"
              id="apellido2"
              name="s_apellido"
              {...register("s_apellido")}
            />
          </div>
        </div>

        {/* Tipo Doc */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label htmlFor="id_tipo_doc">Tipo de identificación:</label>
          </div>
          <div className="col-sm-6">
            {/* Renderizo el elemento con la lista de la bd */}
            <SelectItemForm metodo_api="tipo_doc" />
          </div>
        </div>

        {/* Nro documento */}

        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Número de identificación:</label>
          </div>
          <div className="col-sm-6">
            <input
              type="number"
              className="form-control"
              id="doc"
              placeholder="Nro de doc..."
              name="documento"
              {...register("documento", req)}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.documento?.message}
            </span>
          </div>
        </div>

        {/* Nro Celular */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Celular:</label>
          </div>
          <div className="col-sm-6">
            <input
              type="number"
              className="form-control"
              placeholder="#####"
              id="cel"
              name="celular"
              {...register("celular", {
                required: {
                  value: true,
                  message: "El Nro de celular es requerido",
                },
                minLength: {
                  value: 6,
                  message: "Mínimo 6 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.celular?.message}
            </span>
          </div>
        </div>

        {/* Correo */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Correo electrónico:</label>
          </div>
          <div className="col-sm-6 ">
            <input
              type="email"
              className="form-control"
              placeholder="correo@mail.com"
              id="corr"
              name="correo"
              {...register("correo", req)}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.correo?.message}
            </span>
          </div>
        </div>
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Confirme el correo electrónico:</label>
          </div>
          <div className="col-sm-6 ">
            <input
              type="email"
              className="form-control"
              placeholder="correo@mail.com"
              id="corr2"
              name="correo2"
              {...register("correo2", req)}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.correo2?.message}
            </span>
          </div>
        </div>

        {/* Direccion */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label>Dirección:</label>
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Clle/Cra"
              id="dir"
              name="direccion"
              {...register("direccion", {
                required: {
                  value: true,
                  message: "Una dirección es requerido",
                },
                minLength: {
                  value: 3,
                  message: "Mínimo 3 carácteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.direccion?.message}
            </span>
          </div>
        </div>

        {/* Departamento */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label htmlFor="id_tipo_doc">Departamento:</label>
          </div>
          <div className="col-sm-6">
            {/* Renderizo el elemento con la lista de la bd */}
            <SelectItemForm metodo_api="departamento" />
          </div>
        </div>

        {/* Ciudad */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label htmlFor="id_ciudad">Ciudad:</label>
          </div>
          <div className="col-sm-6">
            {/* Renderizo el elemento con la lista actualizada en el select anterior */}
            <select
              type="text"
              className="form-select"
              name="ciudad"
              defaultValue={0}
              onChange={(event) => {
                setId_ciudad(event.currentTarget.value);
                setId_barrio("");
                setL_barrios([]);
                get_barrios(event);
              }}
              required
            >
              <option></option>
              {l_ciudades.map((ciudad, index) => {
                return (
                  <option key={index} value={ciudad[0]}>
                    {ciudad[1]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Barrio */}
        <div className="form_lbl_input_groupe row">
          <div className="col-sm-6">
            <label htmlFor="id_tipo_doc">Barrio:</label>
          </div>
          <div className="col-sm-6">
            <select
              type="text"
              className="form-select"
              name="barrio"
              onChange={(event) => {
                setId_barrio(event.currentTarget.value);
              }}
              required
            >
              <option></option>
              {l_barrios.map((barrio, index) => {
                return (
                  <option key={index} value={barrio[0]}>
                    {barrio[1]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="row justify-content-around button-group">
          <div className="col-sm-6 form_combo_btn_content">
            <button
              type="summit"
              className="btn btn-primary item_combo_btn"
              form="ClientDataForm"
            >
              {props.registro == true ? "Registrarse" : "Actualizar datos"}
            </button>
            <button
              type="button"
              className="btn btn-secondary item_combo_btn"
              data-bs-dismiss="modal"
              onClick={() => {
                document.getElementById("register-modal").style.display =
                  "none";
              }}
            >
              Descartar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterClientForm;
