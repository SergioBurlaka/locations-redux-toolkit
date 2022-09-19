import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api";

export const filterTodos = (doneVAlue) => async (dispatch) => {
  await api.get(`/todos?done=${doneVAlue}`).then((res) => {
    dispatch(setTodos(res.data));
  });
};

export const getTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const resp = await api.get("/todos");
  return resp.data;
});

export const updateTodos = (todoId, payload) => async (dispatch) => {
  await api.put(`/todos/${todoId}`, payload).then((res) => {
    dispatch(getTodos());
  });
};

export const createTodo = (payload) => async (dispatch) => {
  await api.post(`/todos`, payload).then((res) => {
    dispatch(getTodos());
  });
};
export const deleteTodo = (todoId) => async (dispatch) => {
  await api.delete(`/todos/${todoId}`).then((res) => {
    dispatch(getTodos());
  });
};

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
