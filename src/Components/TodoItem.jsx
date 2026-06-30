import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editText.trim()) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const todoId = `todo-${todo.id}`;

  return (
    <div className="todo-item">
      <div className="todo-item-left">
        <label htmlFor={todoId} className="sr-only">
          {todo.completed ? "Mark as incomplete" : "Mark as complete"}
        </label>
        <input
          id={todoId}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="todo-input"
          />
        ) : (
          <span
            className={`todo-item-text ${todo.completed ? "completed" : ""}`}
            onClick={() => onToggle(todo.id)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-item-actions">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="todo-edit-btn"
            aria-label={`Edit "${todo.text}"`}
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(todo.id)}
          className="todo-delete-btn"
          aria-label={`Delete "${todo.text}"`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
