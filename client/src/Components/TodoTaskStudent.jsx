import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
} from "../redux/action/tasksStudentAction";
import { Link } from "react-router-dom";
import "../Style/todo.css";
import {AiOutlineArrowDown} from 'react-icons/ai'
import {BiTrash} from 'react-icons/bi'

function TodoTasks() {
  const dispatch = useDispatch();
  const {
    isLoadingPost,
    successPost,
    errorPost,
    isLoading,
    todos,
    error,
    isLoadingDelete,
  } = useSelector((state) => state.todos);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoTitle.length === 0) {
      setValidationError("Título é obrigatório");
    } else if (todoDescription.length === 0) {
      setValidationError("Descrição é obrigatória");
    }

    if (todoTitle && todoDescription) {
      setTodoTitle("");
      setTodoDescription("");
      setValidationError("");

      dispatch(createTodo({ todoTitle, todoDescription }));
    }
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo({ todoId }));
  };

  useEffect(() => {
    if (successPost) {
      setSuccessMessage(successPost.message);
    } else if (errorPost) {
      setValidationError("Error: " + errorPost.message);
    }
  }, [successPost, errorPost]);

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
      setValidationError("");
    }, 3000);
  }, [successMessage, validationError]);

  useEffect(() => {
    dispatch(getAllTodos);
  }, [dispatch, isLoadingPost, isLoadingDelete]);

  return (
    <div className="task-container">
      <div className="form-todo">
        <div className="validation-box">
          {validationError && (
            <div>
              <p className="invalid-feedback">{validationError}</p>
            </div>
          )}
          {successMessage && (
            <div>
              <p className="valid-feedback">{successMessage}</p>
            </div>
          )}
        </div>
        <div className="title-task">
          <h3>Lista de tarefas</h3>
          <p>Anote as suas tarefas da semana e mantenha-se organizado(a).</p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="task-form">
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            placeholder="Adicione um título"
          />
          <textarea
            cols="30"
            rows="3"
            placeholder="Adicione uma descrição"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
          <button type="submit" className="add-task-btn">
            {isLoadingPost ? "Adicionando tarefa ..." : "Adicionar tarefa"}
          </button>
        </form>
      </div>
      <div className="todos">
        <div className="todos-container">
        <h2>Tarefas <AiOutlineArrowDown/></h2>
          {isLoading && <h2>Carregando...</h2>}

          {todos.length === 0 ? (
            <h3>Nenhuma Tarefa encontrada</h3>
          ) : (
            todos.todos.map((todo, index) => (
              <div key={index} className='tasks-card'>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <div className="button-task">
                <button onClick={() => handleDeleteTodo(todo._id)} className='delete-btn'>
                  <BiTrash/>
                </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoTasks;
