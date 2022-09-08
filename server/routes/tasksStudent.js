const router = require("express").Router();
const { getAllTodos, getATodo, createATodo, createManyTodos, updateATodo, deleteATodo } = require("../controller/tasksStudent");

router.get("/todos-all/student", getAllTodos);
router.get("/todo/student/:id", getATodo);
router.post("/todo/new/student", createATodo);
router.post("/todos-many/student", createManyTodos);
router.put("/todo/student/:id", updateATodo);
router.delete("/todo/student/:id", deleteATodo);

module.exports = router;