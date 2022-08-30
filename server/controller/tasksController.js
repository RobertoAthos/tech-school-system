const Todo = require("../models/tasks");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    try {
      res.status(200).json({
        message: "Tarefas carregadas com Sucesso.",
        todos: todos,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findOne({ _id: todoId });

    if (!todo) {
      return res.status(404).json({ msg: `No task with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: "Tarefa carregada com sucesso.",
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createATodo = async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Tarefa criada com sucesso",
      });
    }
  });
};

exports.createManyTodos = async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Create many new todos successfully.",
      });
    }
  });
};

exports.updateATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true, runValidators: true });

    if (!todo) {
      return res.status(404).json({ msg: `Não conseguimos encontrar a tarefa id: ${todoId}` });
    } else {
      res.status(200).json({
        msg: `Tarefa id: ${todoId} atualizada com sucesso.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: `Tarefa id: ${todoId} excluída com sucesso.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};