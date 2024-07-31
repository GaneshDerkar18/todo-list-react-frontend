import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Header.css";

const Header = ({ setSearch }) => {
    // Retrieve the current URL search parameters and a function to update them
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Get the current taskName parameter from the URL or default to an empty string
    const taskNameParam = searchParams.get("taskName") || "";

    useEffect(() => {
        // Update the search state in the parent component when the URL searchParams change
        setSearch(taskNameParam);
    }, [taskNameParam, setSearch]); // Dependency array: re-run effect when taskNameParam or setSearch changes

    // Function to handle changes in the search input
    const handleSearch = (value) => {
        // Update the search state in the parent component
        setSearch(value);
        // Update the URL search parameters to reflect the new search value
        setSearchParams({ taskName: value });
    };

    return (
        <div className="header">
            <div className="title">Todo List</div>
            <input
                type="text"
                placeholder="🔍 search-Task"
                value={taskNameParam} // Controlled input value based on the URL parameter
                onChange={(e) => handleSearch(e.target.value)} // Update search on input change
            />
        </div>
    );
};

export default Header;
