import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class ArticleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(255)]),
    content: schema.string({ trim: true }, [rules.minLength(5)]),
    online: schema.boolean.nullableAndOptional(),
    categoryId: schema.number([rules.exists({ table: Category.table, column: 'id' })]),
  })

  public messages = {
    'required': 'The {{ field }} is required.',
    'minLength': 'The {{ field }} must have a minimum of {{ options.minLength }} characters.',
    'maxLenght': 'The {{ field }} must have a minimum of {{ options.minLength }} characters.',
    'categoryId.required': 'The category is required.',
  }
}
