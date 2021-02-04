import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alertMsg } = alertContext;

  console.log(alertMsg, alertContext)
  return (
    <div className="alert alert-danger" style={alertMsg === '' ? {display: 'none'} : {display: 'block'}}role="alert">
      {alertMsg}
    </div>
  )  
}

export default Alert