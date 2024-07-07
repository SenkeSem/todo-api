import express from "express";
import {isAuth, isOwner} from "../middlewares";
import {createTodos, deleteTodo, getAllTodos, updateTodo} from "../controllers/todos";

export default (router: express.Router) => {
  router.get('/todos', isAuth, getAllTodos)
  router.post('/todo', isAuth, createTodos)
  router.get('/todo/:id', isAuth, deleteTodo)
  router.delete('/todo/:id', isAuth, isOwner, deleteTodo)
  router.put('/todo/:id', isAuth, isOwner, updateTodo)
}