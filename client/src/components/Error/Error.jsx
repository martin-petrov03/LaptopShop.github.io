import React from 'react';
import './index.css';

const Error = (props) => {
  return (
    <h4 className="error-message">{props.message}</h4>
  );
}

export default Error;