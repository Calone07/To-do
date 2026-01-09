import React from "react";
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

  return (
    <div className="todo-item">
      <div className="todo-item-left">
        <input
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
          <span className={`todo-item-text ${todo.completed ? "completed" : ""}`}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-item-actions">
        {/* EDIT BUTTON */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="todo-edit-btn"
          >
            Edit
          </button>
        )}

        {/* DELETE BUTTON */}
        <button onClick={() => onDelete(todo.id)} className="todo-delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
