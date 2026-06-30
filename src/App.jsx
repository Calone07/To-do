import { useState, useEffect, useMemo, useCallback } from "react";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import FilterTabs from "./Components/FilterTabs";
import Footer from "./Components/Footer";
import "./styles.css";

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("todos"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      localStorage.removeItem("todos");
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark", saved);
    return saved;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const addTodo = useCallback((text) => {
    setTodos(prev => [{ id: generateId(), text, completed: false }, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id, newText) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
  }, [todos, filter]);

  return (
    <div className="app-container">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h1 className="app-header">To-Do App</h1>
          <button
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
            aria-pressed={darkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <TodoInput onAdd={addTodo} />

        <FilterTabs filter={filter} onChange={setFilter} />

        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {filteredTodos.length} todo{filteredTodos.length !== 1 ? "s" : ""} {filter === "active" ? "remaining" : filter === "completed" ? "completed" : "shown"}
        </div>

        {filteredTodos.length === 0 ? (
          <p className="text-center my-4" style={{ color: "var(--text-gray)" }}>
            No todos to show
          </p>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}

        <Footer todos={todos} onClearCompleted={clearCompleted} />
      </div>
    </div>
  );
}

export default App;
