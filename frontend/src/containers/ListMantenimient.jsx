import React from "react";
//Import CSS
import "@styles/global.css";
const ListMantenimient = (props) => {
  const { mantenimientos } = props;
  return (
    <table className="table table-hover tb-mant">
      <thead>
        <tr className="table-active">
          <th scope="col">
            # Id
          </th>
          <th scope="col">
            Estado
          </th>
          <th scope="col">
            Descripción
          </th>
          <th scope="col">
            Presupuesto
          </th>
        </tr>
      </thead>
      <tbody>
        {mantenimientos.map(function (mantenimiento, key) {
          return (
            <tr role="row" key={key}>
              <td>{mantenimiento[0]}</td>
              <td>{mantenimiento[2]}</td>
              <td>{mantenimiento[5]}</td>
              <td>{mantenimiento[6]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ListMantenimient;
