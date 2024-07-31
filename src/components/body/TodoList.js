import "./TodoList.css";
import { useState } from "react";

const TodoList = ({ todos, toggleComplete, deleteTask, editTask }) => {
  // State to manage which item details are currently visible
  const [showitem, setShowitem] = useState(false);

  // Function to format the last updated time into a human-readable format
  const handlelastupdate = (lastUpdated) => {
    // Convert lastUpdated to a Date object
    const lastUpdatedDate = new Date(lastUpdated);

    // Check if the date is valid
    if (isNaN(lastUpdatedDate.getTime())) {
      return "Invalid date format";
    }

    const now = new Date().getUTCMinutes();
    const minutesAgo = (now - lastUpdatedDate.getUTCMinutes() );
    return `${minutesAgo} min ago`;
  };

  // Function to toggle the visibility of task details
  const handleclick = (id) => {
    // Toggle visibility based on the current state
    setShowitem(showitem === id ? null : id);
  };

  return (
    <ul className="tasklist">
      {todos.map((todo) => (
        <li key={todo.id} className="task-item">
          <div className="task-info">
            {/* Checkbox to mark the task as completed */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {/* Display the task name */}
            <div className="task-name">Task Name: {todo.Todo}</div>

            <div className="task-actions">
              {/* Edit and delete buttons for each task */}
              <button onClick={() => editTask(todo.id)}>Edit</button>
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
            </div>
            <div className="showitem">
              {/* Button to toggle the visibility of task details */}
              <div
                className="showitembutton"
                onClick={() => handleclick(todo.id)}
              >
                {showitem === todo.id ? "🔼" : "🔽"}
              </div>
            </div>
          </div>
          {/* Conditional rendering of task details */}
          {showitem === todo.id && (
            <>
              <div className="task-details">
                {/* Display the last updated time */}
                <div className="task-date">
                  Last Updated: {handlelastupdate(todo.lastupdated)} 
                </div>
                {/* Display the task status */}
                <div className="task-status">
                  {todo.completed ? "Completed" : "Pending"}
                </div>{" "}
              </div>
              {/* Display the task description */}
              <div className="task-description">
                Description: {todo.Description || "No description provided."}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
