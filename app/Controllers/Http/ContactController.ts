import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContactController {

    async index({view}: HttpContextContract)
    {
        return view.render('contact/index')
    }

}
