import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContactEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    subject: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(255)]),
    content: schema.string({ trim: true }, [rules.minLength(20), rules.maxLength(1000)]),
  })

  public messages = {
    required: 'The {{ field }} is required.',
    minLength: 'The {{ field }} must have a minimum of {{ options.minLength }} characters.',
    maxLenght: 'The {{ field }} must have a minimum of {{ options.minLength }} characters.',
  }
}
