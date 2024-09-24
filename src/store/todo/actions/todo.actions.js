import { TODO_ACTION_TYPES } from "../constants";

export function getTodo(todo) {
  return {
    type: TODO_ACTION_TYPES.GET_TODO_SUCCESS,
    payload: todo,
  };
}

export function addTodo(todo) {
  return {
    type: TODO_ACTION_TYPES.ADD_TODO_SUCCESS,
    payload: todo,
  };
}

export function removeTodo(todo) {
  return {
    type: TODO_ACTION_TYPES.REMOVE_TODO_SUCCESS,
    payload: todo,
  };
}

export function updateTodoStatus(todo) {
  return {
    type: TODO_ACTION_TYPES.UPDATE_TODO_STATUS_SUCCESS,
    payload: todo,
  };
}

export function updateTodoTitle(todo) {
  return {
    type: TODO_ACTION_TYPES.UPDATE_TODO_TITLE_SUCCESS,
    payload: todo,
  };
}

export function removeLocal(todo) {
  return {
    type: TODO_ACTION_TYPES.REMOTE_LOCAL,
    payload: todo,
  };
}

