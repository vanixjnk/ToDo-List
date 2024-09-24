import { TODO_ACTION_TYPES } from "../constants";
import { db } from "../../../firebaseConfig";

import "firebase/firestore";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export const initialState = {
  todos: [],
};

export const todoReducer = (state = initialState, action) => {
  // console.log("Action Reducer: ", action);
  switch (action?.type) {
    case TODO_ACTION_TYPES.GET_TODO_SUCCESS:
      return {
        todos: action.payload,
      };
    case TODO_ACTION_TYPES.ADD_TODO_SUCCESS:
      return {
        todos: state.todos.concat(action.payload),
      };

    case TODO_ACTION_TYPES.UPDATE_TODO_TITLE_SUCCESS:
      const updatedTodosTitle = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              updateAt: action.payload.updateAt,
            }
          : todo
      );
      const todoDocUpdateTitle = doc(db, "todos", action.payload.id);
      const updateDataTitle = {
        title: action.payload.title,
        updateAt: action.payload.updateAt,
      };
      // console.log("data update : ", updateDataTitle);
      updateDoc(todoDocUpdateTitle, updateDataTitle);
      return {
        todos: updatedTodosTitle,
      };

    case TODO_ACTION_TYPES.UPDATE_TODO_STATUS_SUCCESS:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      const todoDocUpdate = doc(db, "todos", action.payload.id);
      const updateData = { completed: !action.payload.completed };
      updateDoc(todoDocUpdate, updateData);
      return {
        todos: updatedTodos,
      };

    case TODO_ACTION_TYPES.REMOVE_TODO_SUCCESS:
      const todoDocDelete = doc(db, "todos", action.payload.id);
      deleteDoc(todoDocDelete);
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case TODO_ACTION_TYPES.REMOTE_LOCAL:
      return initialState;
    default:
      return state;
  }
};
