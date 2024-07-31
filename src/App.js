import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import TodoTask from "./components/body/TodoTask";
import { useState } from "react";
import data from "./utils/todos.json";

function App() {
    // State for the new todo item
    const [Todo, setTodo] = useState("");
    // State for the list of todos, initialized with data from a JSON file
    const [Todos, setTodos] = useState(data);
    // State for the ID of the todo item being edited
    const [EditId, setEditId] = useState(0);
    // State for the description of the todo item
    const [Description, setDescription] = useState("");
    // State for the search query
    const [search, setSearch] = useState("");

    // Function to handle form submission (adding/editing todos)
    const handleSubmit = (e) => {
        e.preventDefault();

        // If there's an EditId, update the existing todo item
        if (EditId) {
            const updatedTodo = Todos.map((t) =>
                t.id === EditId
                    ? {
                          id: t.id,
                          Todo,
                          Description,
                          lastupdated: t.lastupdated,
                          completed: t.completed,
                      }
                    : t
            );

            // Update the todos state with the modified list
            setTodos(updatedTodo);
            // Reset the editing state and input fields
            setEditId(0);
            setTodo("");
            setDescription("");
            return;
        }

        // If no EditId and there's a todo, add it to the list
        if (Todo !== "") {
            setTodos([
                {
                    id: Date.now(), // Unique ID based on timestamp
                    Todo,
                    Description,
                    lastupdated: new Date(),
                    completed: false, // New todo item is not completed by default
                },
                ...Todos, // Add new todo to the beginning of the list
            ]);
            // Clear input fields after adding
            setTodo("");
            setDescription("");
        }
    };

    // Function to toggle the completion status of a todo item
    const toggleComplete = (id) => {
        setTodos(
            Todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Function to delete a todo item by its ID
    const deleteTask = (id) => {
        const deltodo = Todos.filter((todo) => todo.id !== id);
        setTodos([...deltodo]);
    };

    // Function to populate the form with data from a todo item for editing
    const editTask = (id) => {
        const editTodo = Todos.find((i) => i.id === id);
        setTodo(editTodo.Todo);
        setDescription(editTodo.Description);
        setEditId(id);
    };

    // Filter todos based on the search query
    const filterTodos = Todos.filter((todo) =>
        todo.Todo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Router>
            <div className="App">
                {/* Header component with search functionality */}
                <Header setSearch={setSearch} searchvalue={search} />
                {/* TodoTask component for displaying and managing todo items */}
                <TodoTask
                    handleSubmit={handleSubmit}
                    Todo={Todo}
                    Description={Description}
                    setTodo={setTodo}
                    setDescription={setDescription}
                    todos={Todos}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                    editId={EditId}
                    editTask={editTask}
                    filterTodos={filterTodos}
                />
            </div>
        </Router>
    );
}

export default App;
