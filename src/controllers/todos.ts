import express from "express";
import get from "lodash/get";
import {createTodo, deleteTodoById, getTodos, getTodosById, updateTodoById} from "../db/todos";

export const getAllTodos = async (req: express.Request, res: express.Response) => {
  try {
    const currentUserId = get(req, 'identity._id' as string)
    const todos = await getTodos(currentUserId)

    return res.status(200).json(todos).end()
  } catch (e) {
    console.log('error ', e)
    return res.sendStatus(400)
  }
}

export const getTodo = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const todo = await getTodosById(id)

    return res.status(200).json(todo).end()
  } catch (e) {
    console.log('error ', e)
    return res.sendStatus(400)
  }
}

export const createTodos = async (req: express.Request, res: express.Response) => {
  try {
    const { title, ...values } = req.body

    if (!title) {
      return res.status(400).send('Field can`t be empty!')
    }

    const currentUserId = get(req, 'identity._id' as string)
    const todo = await createTodo({
      title,
      ...values,
      userId: currentUserId
    })

    return res.status(200).json(todo).end()
  } catch (e) {
    console.log('error ', e)
    return res.sendStatus(400)
  }
}

export const deleteTodo = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    const deletedTodo = await deleteTodoById(id)

    res.statusMessage = 'User was deleted successfully!'
    return res.status(200).json(deletedTodo).end()
  } catch (e) {
    console.log('error ', e)
    return res.sendStatus(400)
  }
}

export const updateTodo = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const { title, ...values } = req.body

    if (!title) {
      return res.status(400).send('Field can`t be empty!')
    }
    const currentUserId = get(req, 'identity._id' as string)
    const updatedTodo = {
      title,
      ...values,
      userId: currentUserId
    }
    const upd = await updateTodoById(id, updatedTodo)

    res.statusMessage = 'User was updated successfully!'
    return res.status(200).json({...upd, ...updatedTodo}).end()
  } catch (e) {
    console.log('error1 ', e)
    return res.sendStatus(400)
  }
}
