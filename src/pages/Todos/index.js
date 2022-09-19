import React from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  getTodos,
  updateTodos,
  createTodo,
  deleteTodo,
  filterTodos,
  setTodos
} from "../../redux/features/Todos/todosSlice";

function Todos() {
  const [newTodo, setNewTodo] = useState({
    done: false,
    name: "",
  });
  const { todos } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const addTodoHandler = () => {
    dispatch(createTodo(newTodo));
    setNewTodo({
      done: false,
      name: "",
    });
  };

  const deleteHandler = (todoId) => dispatch(deleteTodo(todoId));

  const doneHandler = (todoId) => {
    const newTodos = todos.map((item) => {
      if (item.id === todoId) {
        dispatch(updateTodos(todoId, { ...item, done: !item.done }));
      }
      return item.id === todoId ? { ...item, done: !item.done } : { ...item };
    });
    dispatch(setTodos(newTodos));
  };

  const editHandler = (todoId) => {
    const newTodos = todos.map((item) => {
      return item.id === todoId ? { ...item, isEdit: true } : { ...item };
    });

    dispatch(setTodos(newTodos));
  };

  const saveHandler = (todoId) => {
    const newTodos = todos.map((item) => {
      if (item.id === todoId) {
        dispatch(updateTodos(todoId, { ...item, isEdit: false }));
      }
      return item.id === todoId ? { ...item, isEdit: false } : { ...item };
    });
    dispatch(setTodos(newTodos));
  };

  const onChangeTodoName = (newTodoName, todoId) => {
    const newTodos = todos.map((item) => {
      return item.id === todoId ? { ...item, name: newTodoName } : { ...item };
    });
    dispatch(setTodos(newTodos));
  };

  const getComplited = () => dispatch(filterTodos(true));
  const getNotComplited = () => dispatch(filterTodos(false));

  return (
    <div>
      <div>Create todo</div>
      <input
        type="text"
        value={newTodo.name}
        onChange={(event) => {
          setNewTodo({ ...newTodo, name: event.target.value });
        }}
      />

      <button onClick={addTodoHandler}>Add todo</button>

      <div className="filter">
        <button onClick={getComplited}>Complited</button>
        <button onClick={getNotComplited}>Not complited</button>
        <button onClick={() => dispatch(getTodos())}>All todo</button>
      </div>

      <div>
        <ul>
          {todos &&
            todos.map((item) => {
              return (
                <li key={item.id} className="card">
                  <div className="card__box">
                    <span>Done</span>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => doneHandler(item.id)}
                    />
                  </div>
                  {item?.isEdit ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(event) =>
                        onChangeTodoName(event.target.value, item.id)
                      }
                    />
                  ) : (
                    <div className="card__content">{item.name}</div>
                  )}

                  <div className="card__handler">
                    <button onClick={() => deleteHandler(item.id)}>
                      delete
                    </button>
                    {item?.isEdit ? (
                      <button onClick={() => saveHandler(item.id)}>Save</button>
                    ) : (
                      <button onClick={() => editHandler(item.id)}>Edit</button>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
