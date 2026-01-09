import React from "react";


function Footer({ todos, onClearCompleted }) {
  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="footer">
      <span>{remaining} {remaining === 1 ? "task" : "tasks"} left</span>
      <button onClick={onClearCompleted}>Clear Completed</button>
    </div>
  );
}

export default Footer;
