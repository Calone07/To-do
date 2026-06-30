import { memo } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) return null;

  return (
    <ul className="todo-list" role="list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
}

export default memo(TodoList);
