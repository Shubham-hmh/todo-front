import axios from 'axios';
import { base_url,todo_url} from '../../utils/axiosConfig';


const getTodos = async () => {
    const response = await axios.get(`${todo_url}`);
    if (response.data) {
        return response.data;
    }
}


const editTodos = async (yourData) => {
    const {prodId,todoData} =yourData;

    console.log(prodId,"👍👍👍👍👍",todoData);
    const response =await axios.patch(`${todo_url}updateTodo/${prodId}`,todoData);
    if (response.data) {
        return response.data;
    }

}

const deleteTodo = async (todoId) => {
    const response =await axios.delete(`${todo_url}deleteTodo/${todoId}`);
    if (response.data) {
        return response.data;
    }

}

const singleTodo = async (todoId) => {
    const response =await axios.get(`${todo_url}find/${todoId}`);
    if (response.data) {
        return response.data;
    }

}

const addTodos =async (todoData)=>{
    const response =await axios.post(`${todo_url}`,todoData);
    if (response.data) {
        return response.data;
    }

}

export const todoService = {
getTodos,
editTodos,
deleteTodo,
addTodos,
singleTodo
    
}