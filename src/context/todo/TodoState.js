import React, { useReducer, useContext } from 'react';
import TodoContext from './todoContext';
import AlertContext from '../../context/alert/alertContext';
import TodoReducer from './todoReducer';
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

const TodoState = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const initialState = {
    todos: null,
    loading: true,
    editMode: false,
    todoToEdit: {
      id: null,
      title: '',
      completed: false
    },
    filtered:[]
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  // Get Todos
  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:5000/todos');
      const data = await res.json()
      dispatch({ type: GET_TODOS, payload: data});
    } catch (err) {
      setAlert(err.message) 
    }
  }

  // Get single todo
  const getSingleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`);
    const data = await res.json()
    return data 
  }

  // Complete Todo
  const completeTodo = async (id) => {
    state.loading = true;
    const dbTodo = await getSingleTodo(id);
    dbTodo.completed = !dbTodo.completed;
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(dbTodo)
    });
    const data = await res.json();
    dispatch({ type: COMPLETE_TODO, payload: data});
  }

  // Delete a todo
  const deleteTodo = async (id) => {
    state.loading = true;
    await fetch(`http://localhost:5000/todos/${id}`, {method: 'DELETE'});
    dispatch({ type: DELETE_TODO, payload: id});
  }

  // Add Todo
  const addTodo = async (title) => {
    state.loading = true;
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({title, completed:false})
    });
    const data = await res.json();
    dispatch({ type: ADD_TODO, payload: data});
  }

  // Activate Edit Mode
  const activateEditMode = todo => {
    dispatch({ type: ACTIVATE_EDIT_MODE, payload: todo});
  }

  // Deactivate Edit Mode
  const deactivateEditMode = () => {
    dispatch({ type: DEACTIVATE_EDIT_MODE });
  }

  // Edit Todo
  const editTodo = async (id, title) => {
    state.loading = true;
    const dbTodo = await getSingleTodo(id);
    dbTodo.title = title;
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(dbTodo)
    });
    const data = await res.json();
    dispatch({ type: EDIT_TODO, payload: data});
  }

  // Search Todo
  const searchTodo = title => {
    dispatch({ type: SEARCH_TODO, payload: title});
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        editMode: state.editMode,
        todoToEdit: state.todoToEdit,
        filtered: state.filtered,
        getTodos,
        deleteTodo,
        completeTodo,
        addTodo,
        activateEditMode,
        deactivateEditMode,
        editTodo,
        searchTodo
      }}
    >
      {props.children}
    </TodoContext.Provider>
  )
};

export default TodoState