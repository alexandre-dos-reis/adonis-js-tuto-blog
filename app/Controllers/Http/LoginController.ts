import type { HttpContextContract as ctx } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public async index({ view }: ctx) {
    return view.render('login/index')
  }
}
