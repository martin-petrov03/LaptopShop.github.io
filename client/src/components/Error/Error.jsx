import React from 'react';
import './index.css';

const Error = (props) => {
  return (
    <h3 className="error-message">{props.message}</h3>
  );
}

export default Error;