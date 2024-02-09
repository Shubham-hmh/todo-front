
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getAllTodos } from "../features/todo/todoSlice";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import './Table.css'; 

const Table = () => {
    const todoState = useSelector((state) => state?.todo?.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        dispatch(getAllTodos());
    }

    const deleteUser = async (id) => {
        await dispatch(deleteTodo(id));
        getTodos();
    }

    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    const [filterStatus, setFilterStatus] = useState(null); 
    const [sortBy, setSortBy] = useState('title'); 
const [sortType, setSortType] = useState('asc'); 

    const itemsPerPage = 5;

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1); 
    }

    const handleSort = (column) => {
        if (column === sortBy) {
            setSortType(sortType === 'asc' ? 'desc' : 'asc');
        } else {
            setSortType('asc');
            setSortBy(column);
        }
    }

    const handleFilterChange = (value) => {
        setFilterStatus(value);
        setCurrentPage(1); 
    }

    let sortedTodos = [];
    if (Array.isArray(todoState)) {
        sortedTodos = [...todoState];
        if (sortBy) {
            sortedTodos.sort((a, b) => {
                if (sortBy === 'title') {
                    return sortType === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                } else if (sortBy === 'createdAt') {
                    return sortType === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
                }
            });
        }
    }

    const filteredTodos = sortedTodos.filter(todo =>
        todo.status.toLowerCase().includes(searchText.toLowerCase()) &&
        (!filterStatus || todo.status === filterStatus)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getSortIcon = (column) => {
        if (sortBy === column) {
            return sortType === 'asc' ? '▲' : '▼';
        }
        return null;
    }

    return (
        <div className="container mt-5">
   <p className="sort-info">
  Click Title or Creation Time for sorting <span className="star">&#9733;</span> {new Date().toLocaleTimeString()}
</p>

            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search for status..."
                    className="form-control"
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    {/* Table Header */}
                    <thead className="table-dark">
                        <tr>
                            <th onClick={() => handleSort('title')}>
                                <div className="header-cell">
                                    Title
                                    <span className="sort-icon">{getSortIcon('title')}</span>
                                </div>
                            </th>
                            <th style={{ width: "60%" }}>Description</th>
                            <th>
                                <div className="header-cell">
                                Status

                                    <select
                                        className="form-select"
                                        defaultValue={null}
                                        onChange={(e) => handleFilterChange(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </th>
                            <th onClick={() => handleSort('createdAt')}>
                                <div className="header-cell">
                                    Creation Time {getSortIcon('createdAt')}
                                </div>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {currentTodos.map((element, index) => {
                            const creationTime = new Date(element.createdAt).toLocaleString();
                            return (
                                <tr key={element._id}>
                                    <td>{element.title}</td>
                                    <td>{element.description}</td>
                                    <td>{element.status}</td>
                                    <td>{creationTime}</td>
                                    <td className="">
                                        <NavLink to={`edit/${element._id}`} className="btn btn-primary me-2 mb-2">
                                            <CreateIcon />
                                        </NavLink>
                                        <button className="btn btn-danger" onClick={() => deleteUser(element._id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(filteredTodos.length / itemsPerPage) }).map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Table;
