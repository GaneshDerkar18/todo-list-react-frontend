import TodoList from './TodoList';
import './TodoTask.css';

const TodoTask = ({
    handleSubmit, // Function to handle form submission (add or edit task)
    Todo, // Current task title value
    Description, // Current task description value
    setTodo, // Function to update task title state
    setDescription, // Function to update task description state
    toggleComplete, // Function to toggle the completion status of a task
    deleteTask, // Function to delete a task
    editId, // ID of the task currently being edited (if any)
    editTask, // Function to set the task details for editing
    filterTodos // Array of filtered todos to display
}) => {
    return (
        <div className="container">
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    {/* Input field for task title */}
                    <input 
                        type="text" 
                        placeholder='Enter task title' 
                        value={Todo} 
                        onChange={(e) => setTodo(e.target.value)} // Update task title state on change
                    />
                    {/* Input field for task description */}
                    <input 
                        type="text" 
                        placeholder='Enter your task details' 
                        value={Description} 
                        onChange={(e) => setDescription(e.target.value)} // Update task description state on change
                    />
                    {/* Submit button text changes based on whether a task is being edited */}
                    <button type='submit'>{editId ? "Edit" : "Add Task"}</button>
                </form>
            </div>

            <div className='list'>
                {/* Render the TodoList component with filtered todos and handler functions */}
                <TodoList 
                    todos={filterTodos} 
                    toggleComplete={toggleComplete} 
                    deleteTask={deleteTask} 
                    editTask={editTask} 
                />
            </div>
        </div>
    );
}

export default TodoTask;
