import instance from "@/config/axios.config";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  _id: string;
  userId: string;
  title?: string;
  description?: string;
}

interface TodoState {
  userId: string;
  todos: Todo[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: TodoState = {
  userId: "",
  todos: [],
  loading: false,
  error: {
    name: "",
    message: "",
    stack: "",
    code: "",
  }
};

interface TodoPayload {
  userId: string;
  title?: string;
  description?: string;
}

export const getAllTodos = createAsyncThunk<Todo[], void, { rejectValue: string; }>(
  'todo/get-all-todos',
  async (_, { rejectWithValue }) => {
    try {
      const responseTodos = await instance.get('/good-deeds');
      return responseTodos.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Get all todos is failed!');
      }
      return rejectWithValue('Get all todos is failed!');
    }
  }
);

export const createTodo = createAsyncThunk<Todo, TodoPayload, { rejectValue: string; }>(
  'todo/create-todo',
  async (payload: TodoPayload, { rejectWithValue }) => {
    const { userId, title, description } = payload;

    try {
      const createTodo = await instance.post('/good-deeds/create', { userId, title, description });
      return createTodo.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Create todo is failed');
      }
      return rejectWithValue('Create todo is failed');
    }
  }
);
export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string; }>(
  'todo/delete-todo',
  async (userId: string, { rejectWithValue }) => {
    try {
      await instance.delete(`/good-deeds/${userId}`);
      return userId;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Create todo is failed');
      }
      return rejectWithValue('Create todo is failed');
    }
  }
);


const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = { name: action.error.name, message: action.error.message, stack: action.error.stack, code: action.error.code };
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = { name: action.error.name, message: action.error.message, stack: action.error.stack, code: action.error.code };
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(todo => todo.userId !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = { name: action.error.name, message: action.error.message, stack: action.error.stack, code: action.error.code };
      });
  }
});

export default todoSlice.reducer;