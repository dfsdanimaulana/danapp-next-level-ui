import Joi from 'joi'
import { password } from './custom'

export const registerSchema = Joi.object().keys({
  name: Joi.string().lowercase().trim().min(4).max(20).required().messages(generateMessages('name')),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages(generateMessages('email')),
  password: Joi.string().custom(password).required().messages(generateMessages('password')),
  confirm_password: Joi.equal(Joi.ref('password')).required().messages(generateMessages('confirm password'))
})

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages(generateMessages('email')),
  password: Joi.string().required().messages(generateMessages('password'))
})

export const createPostSchema = Joi.object().keys({
  caption: Joi.string().required().messages(generateMessages('caption')),
  hashtag: Joi.string().messages(generateMessages('hashtag'))
})

function generateMessages(name) {
  return {
    'string.base': `${name} should be a type of 'text'`,
    'string.empty': `${name} cannot be an empty field`,
    'string.min': `${name} should have a minimum length of {#limit}`,
    'string.max': `${name} should have a maximum length of {#limit}`,
    'any.required': `${name} is a required field`
  }
}
