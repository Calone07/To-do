import { memo, useMemo } from "react";

function Footer({ todos, onClearCompleted }) {
  const remaining = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  const hasCompleted = useMemo(
    () => todos.some((todo) => todo.completed),
    [todos]
  );

  return (
    <div className="footer">
      <span>{remaining} {remaining === 1 ? "task" : "tasks"} left</span>
      {hasCompleted && (
        <button onClick={onClearCompleted}>Clear Completed</button>
      )}
    </div>
  );
}

export default memo(Footer);
