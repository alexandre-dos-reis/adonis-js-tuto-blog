import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryController {
  public async index({ view }: HttpContextContract) {
    return view.render('category/index')
  }
}
