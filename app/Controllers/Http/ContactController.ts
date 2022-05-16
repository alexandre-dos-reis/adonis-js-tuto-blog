import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract as ctx } from '@ioc:Adonis/Core/HttpContext'
import ContactEmailValidator from 'App/Validators/ContactEmailValidator'

export default class ContactController {
  public async index({ view }: ctx) {
    return view.render('contact/index')
  }

  public async sendEmail({ session, response, request }: ctx) {
    const data = await request.validate(ContactEmailValidator)
    await Mail.send((message) => {
      message
        .from(data.email)
        .to('contact@gmail.com')
        .subject(request.input('subject'))
        .htmlView('emails/welcome', {
          content: data.content,
        })
    })
    session.flash({ success: 'Your email have been sent.' })
    return response.redirect().back()
  }
}
