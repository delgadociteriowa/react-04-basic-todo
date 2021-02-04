import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
  SET_ALERT, 
  REMOVE_ALERT
} from '../types';

const AlertState = props => {
  const initialState = {
    alertMsg: '',
    fetchError: false
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, timeout = 10000) => {
    dispatch({ type: SET_ALERT, payload: msg});
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout)
  }

  return (
    <AlertContext.Provider
      value={{
        alertMsg: state.alertMsg,
        fetchError: state.fetchError,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
};

export default AlertState;