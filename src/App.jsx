
import React, { useState, useEffect } from "react";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import FilterTabs from "./Components/FilterTabs";
import Footer from "./components/Footer";
import "./styles.css"; // <- import external CSS

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);

    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    document.body.classList.toggle("dark", savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      document.body.classList.toggle("dark", !prev);
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  const addTodo = (text) => {
    setTodos([{ id: crypto.randomUUID(), text, completed: false }, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h1 className="app-header">To-Do App</h1>
          <button
            onClick={toggleDarkMode}
            className="todo-add-btn"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <TodoInput onAdd={addTodo} />

        <FilterTabs filter={filter} onChange={setFilter} />

        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 my-4">No todos to show</p>
        ) : (
          <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
        )}

        <Footer todos={todos} onClearCompleted={clearCompleted} />
      </div>
    </div>
  );
}

export default App;