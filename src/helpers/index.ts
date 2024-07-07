import crypto from "crypto";
import {SECRET} from "../contsants";

export const random = () => crypto.randomBytes(128).toString('base64');
export const auth = (salt: string, pass: string) => {
  return crypto.createHmac('sha256', [salt, pass].join('/')).update(SECRET).digest('hex')
}