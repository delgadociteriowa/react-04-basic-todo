import React, { useState, useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const EditTodo = () => {
  const todoContext = useContext(TodoContext);
  const { todoToEdit, deactivateEditMode, editTodo } = todoContext;
  const [title, setTitle] = useState(todoToEdit.title);
  
  const onChange = e => setTitle(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    editTodo(todoToEdit.id, title);
    setTitle('');
    deactivateEditMode();
  }

  const deactivate = e => {
    e.preventDefault();
    deactivateEditMode();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" name="title" value={title} onChange={onChange}/>
      </div>
      <button type="submit" className="btn btn-success" disabled={title === '' ? true : false}>Submit</button>
      <button className="btn btn-secondary" style={{marginLeft: '5px'}} onClick={deactivate}>Cancel</button>
    </form>
  )
}

export default EditTodo
