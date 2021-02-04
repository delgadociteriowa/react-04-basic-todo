import {
  GET_TODOS,
  DELETE_TODO,
  COMPLETE_TODO,
  ADD_TODO,
  ACTIVATE_EDIT_MODE,
  DEACTIVATE_EDIT_MODE,
  EDIT_TODO,
  SEARCH_TODO
} from '../types';

const todoReducer = (state, action) => {
  switch(action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false
      }
    case COMPLETE_TODO:
      const changedTodo = action.payload;
      return {
        ...state,
        todos: [...state.todos.map(todo => {
          if(todo.id === changedTodo.id) {
            todo = {...changedTodo};
          }
          return todo
        })],
        loading: false
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        loading: false
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false
      }
    case ACTIVATE_EDIT_MODE:
      return {
        ...state,
        editMode: true,
        todoToEdit: action.payload
      }
    case DEACTIVATE_EDIT_MODE:
      return {
        ...state,
        editMode: false,
        todoToEdit: null
      }
    case EDIT_TODO:
      const editedTodo = action.payload;
      return {
        ...state,
        todos:[...state.todos.map(todo => {
            if(todo.id === editedTodo.id){
              todo.title = editedTodo.title
            }
            return todo;
          }
        )],
        loading:false
      }
    case SEARCH_TODO:
      const toSearch = action.payload;
      return{
        ...state,
        filtered: [...state.todos.filter(todo => {
          const regex = new RegExp(`${toSearch}`, 'gi');
          return todo.title.match(regex)
        })]
      }
    default:
      return state;
  }
}

export default todoReducer