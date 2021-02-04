import { useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';
import PropTypes from 'prop-types';

const TodoItem = ({todo}) => {
  const todoContext = useContext(TodoContext);
  const { deleteTodo, completeTodo, activateEditMode } = todoContext;
  const { id, title, completed } = todo;

  const onDelete = () => {
    deleteTodo(id);
  }

  const onDoubleClick = () => {
    completeTodo(id);
  }

  const onEdit = () => {
    activateEditMode(todo);
  }

  return(
    <li className="list-group-item" onDoubleClick={onDoubleClick}>
      <span  className={completed ? 'completed' : undefined}>{title}</span>
      <button className="btn btn-danger btn-todo" onClick={onDelete}>Delete</button>
      <button className="btn btn-primary btn-todo" onClick={onEdit}>Edit</button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
}

export default TodoItem