import React, { Fragment, useContext } from 'react';
import Todos from '../todos/Todos';
import AddTodo from '../todos/AddTodo';
import EditTodo from '../todos/EditTodo';
import SearchTodo from '../todos/SearchTodo';
import TodoContext from '../../context/todo/todoContext';

const Home = () => {
  const todoContext = useContext(TodoContext);
  const { editMode } = todoContext;

  return (
    <Fragment>
      {
        editMode ?
        <EditTodo/>:
        <AddTodo/>
      }
      <SearchTodo/>
      <Todos/>
    </Fragment>
  )
}

export default Home