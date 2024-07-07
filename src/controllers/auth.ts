import express from "express";

import {createUser, getUserByEmail} from "../db/users";
import {auth, random} from "../helpers";
import {COOKIE_AUTH} from "../contsants";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send('Fields can`t be empty!')
    }

    const user = await getUserByEmail(email).select('+auth.salt +auth.password')

    if (!user) {
      return res.status(400).send('Incorrect email or password')
    }

    const expectedHash = auth(user.auth.salt, password)

    if (user.auth.password !== expectedHash) {
      return res.status(403).send('Incorrect email or password')
    }

    const salt = random()
    user.auth.sessionToken = auth(salt, user._id.toString())

    await user.save()

    res.cookie(COOKIE_AUTH, user.auth.sessionToken, { domain: 'localhost', path: '/' })

    return res.status(200).json(user).end()
  } catch (e) {
    console.log('error ', e)
    return res.sendStatus(400)
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.status(400).send('Fields can`t be empty!')
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return res.status(400).send('User is already exist')
    }

    const salt = random()
    const user = await createUser({
      email,
      username,
      auth: {
        salt,
        password: auth(salt, password)
      }
    })

    return res.status(200).json(user).end()
  } catch (e) {
    console.log('error ', e);
    return res.sendStatus(400)
  }
}