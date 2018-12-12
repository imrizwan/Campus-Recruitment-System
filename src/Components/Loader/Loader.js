import React from 'react';
import loader from "./loader.svg";

export default () => {
  return (
    <div>
      <img
        src={loader}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
