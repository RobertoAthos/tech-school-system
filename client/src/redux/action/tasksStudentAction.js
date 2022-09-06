import axios from "axios";
import { DELETE_TODOS_FAILURE, DELETE_TODOS_REQUEST, DELETE_TODOS_SUCCESS, GET_TODOS_FAILURE, GET_TODOS_REQUEST, GET_TODOS_SUCCESS, POST_TODOS_FAILURE, POST_TODOS_REQUEST, POST_TODOS_SUCCESS } from "../actionTypes";
const apiUrl = "https://tech-school-backend.herokuapp.com/api/tasksStudent";

export const getAllTodos = async (dispatch) => {
    dispatch({ type: GET_TODOS_REQUEST });
  
    try {
      const res = await axios.get(apiUrl + "/todos-all/student");
      dispatch({ type: GET_TODOS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_TODOS_FAILURE, payload: error });
    }
  };
  
  // make a action to create a todo
  export const createTodo = (payload) => async (dispatch) => {
    dispatch({ type: POST_TODOS_REQUEST });
  
    try {
      const res = await axios.post(apiUrl + "/todo/new/student", {
        title: payload.todoTitle,
        description: payload.todoDescription,
      });
      dispatch({ type: POST_TODOS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: POST_TODOS_FAILURE, payload: error });
    }
  };
  
  // make a action to delete a todo
  export const deleteTodo = (payload) => async (dispatch) => {
    dispatch({ type: DELETE_TODOS_REQUEST });
  
    try {
      const res = await axios.delete(apiUrl + "/todo/student/" + payload.todoId);
      dispatch({ type: DELETE_TODOS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: DELETE_TODOS_FAILURE, payload: error });
    }
  };