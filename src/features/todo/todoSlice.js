import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { todoService } from "./todoService";


export const getAllTodos = createAsyncThunk("todo/get", async (thunkAPI) => {
    try {
        return await todoService.getTodos();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addTodo = createAsyncThunk("todo/add", async (todoData,thunkAPI) => {
    console.log(todoData,"😒😒😒😒");
    try {
        return await todoService.addTodos(todoData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const editTodo = createAsyncThunk("todo/edit", async ({prodId,todoData},thunkAPI) => {
    try {
        return await todoService.editTodos({prodId,todoData});
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const singleTodo = createAsyncThunk("todo/getSingle", async (prodId,thunkAPI) => {
    try {
        return await todoService.singleTodo(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteTodo = createAsyncThunk("todo/delete", async (prodId,thunkAPI) => {
    try {
        return await todoService.deleteTodo(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


const todoState={
    todo:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

export const todoSlice = createSlice({
    name: "todo",
    initialState: todoState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllTodos.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllTodos.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.todo=action.payload;
        
        }).addCase(getAllTodos.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(editTodo.pending,(state)=>{
            state.isLoading=true;
        }).addCase(editTodo.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess =true;
            state.todo=action.payload;
            state.message="Todo Updated";
            if(state.isSuccess===true){
                toast.info("Todo Updated");
            }

        }).addCase(editTodo.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteTodo.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteTodo.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess =true;
            state.todo=action.payload;
            state.message="Todo deleted";
            if(state.isSuccess===true){
                toast.info("Todo Deleted ");
            }

        }).addCase(deleteTodo.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addTodo.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addTodo.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess =true;
            state.todo=action.payload;
            state.message="Todo added";
            if(state.isSuccess===true){
                toast.info("Todo added Successfully");
            }

        }).addCase(addTodo.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(singleTodo.pending,(state)=>{
            state.isLoading=true;
        }).addCase(singleTodo.fulfilled,(state,action)=>{
            console.log(action);
            state.isLoading=false;
            state.isError=false;
            state.isSuccess =true;
            state.todo=action.payload;
       
      

        }).addCase(singleTodo.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })

    }
});


export default todoSlice.reducer;
