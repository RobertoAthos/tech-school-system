const router = require("express").Router();
const { getAllTodos, getATodo, createATodo, createManyTodos, updateATodo, deleteATodo } = require("../controller/tasksAdmin");

router.get("/todos-all/admin", getAllTodos);
router.get("/todo/admin/:id", getATodo);
router.post("/todo/new/admin", createATodo);
router.post("/todos-many/admin", createManyTodos);
router.put("/todo/admin/:id", updateATodo);
router.delete("/todo/admin/:id", deleteATodo);

module.exports = router;