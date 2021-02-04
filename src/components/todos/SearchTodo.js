import React, { useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const SearchTodo = () => {
  const todoContext = useContext(TodoContext);
  const { searchTodo } = todoContext;
  
  const onChange = e => {
    searchTodo(e.target.value)
  }

  return (
    <form>
      <div className="form-group">
        <input type="text" className="form-control" name="title" onChange={onChange} placeholder="Search Todo"/>
      </div>
    </form>
  )
}

export default SearchTodo
