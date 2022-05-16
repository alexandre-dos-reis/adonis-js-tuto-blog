import type { HttpContextContract as ctx } from '@ioc:Adonis/Core/HttpContext'

export default class SecurityController {
  public async login({ view }: ctx) {
    return view.render('login/index')
  }

  public async logout({ auth, response, session }: ctx) {
    await auth.use('web').logout()
    session.flash({ success: 'You have been logged out.' })
    response.redirect('/login')
  }

  public async auth({ request, auth, response, session }: ctx) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      session.flash({ success: 'You are logged in.' })
      response.redirect().toRoute('blog.index')
    } catch {
      session.flash({ error: 'Wrong credentials !' })
      response.redirect().toRoute('login')
    }
  }
}
