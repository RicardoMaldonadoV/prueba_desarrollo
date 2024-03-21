import React from 'react';

const HomeModule = (props) => {
  const { title, moduleType } = props;
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-center "> {title} </h4>
        <hr />
        {moduleType}
      </div>
    </div>
  );
};

export default HomeModule;
