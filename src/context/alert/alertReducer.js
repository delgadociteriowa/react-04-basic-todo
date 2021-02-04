import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertReducer = (state, action) => {
  switch(action.type) {
    case SET_ALERT:
      return {
        ...state,
        alertMsg: action.payload,
        fetchError: true
      }
    case REMOVE_ALERT:
      return  {
        ...state,
        alertMsg: ''
      } 
    default:
      return state
  }
}

export default AlertReducer