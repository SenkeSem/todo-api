import express from "express";
import get from 'lodash/get';
import merge from 'lodash/merge';

import { getUserBySessionToken } from '../db/users'
import {COOKIE_AUTH} from "../contsants";
import {getTodosById} from "../db/todos";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string

    if (!currentUserId) {
      return res.sendStatus(403)
    }

    const currentTodo = await getTodosById(id)
    if (currentTodo.userId !== currentUserId.toString()) {
      return res.status(404).send('Don`t have permission')
    }

    return next()
  } catch (e) {
    console.log('error ', e)
    return res.sendStatus(400)
  }
}

export const isAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.headers['authorization'];

    if (!sessionToken) {
      return res.sendStatus(403)
    }

    const existingUser = await getUserBySessionToken(sessionToken.toString())
    if (!existingUser) return res.sendStatus(403)

    merge(req, { identity: existingUser })

    return next()
  } catch (e) {
    console.log('error ', e)
    return res.sendStatus(400)
  }
}