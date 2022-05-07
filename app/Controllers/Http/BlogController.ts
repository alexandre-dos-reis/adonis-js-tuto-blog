import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import ArticleValidator from 'App/Validators/ArticleValidator'

export default class BlogController {
  public async index({ view }: HttpContextContract) {
    const articles = await Article.all()
    return view.render('blog/index', {
      articles,
    })
  }

  public async createArticle({ view, request, response, session }: HttpContextContract) {
    const article = new Article()

    if (request.method() === 'POST') {
      const data = await request.validate(ArticleValidator)
      article.merge({ ...data, online: data.online || false }).save()
      session.flash({ success: `The article ${article.title} was created !` })
      return response.redirect().toRoute('blog.index')
    }

    return view.render('blog/createArticle', {
      article,
    })
  }

  public async updateArticle({ view, params, request, response, session }: HttpContextContract) {
    const article = await Article.findOrFail(params.id)

    if (request.method() === 'POST') {
      const data = await request.validate(ArticleValidator)
      article.merge({ ...data, online: data.online || false }).save()
      session.flash({ success: `The article ${article.title} was updated !` })
      return response.redirect().toRoute('blog.index')
    }

    return view.render('blog/editArticle', {
      article,
    })
  }

  public async deleteArticle({ params, response, session }: HttpContextContract) {
    const article = await Article.findOrFail(params.id)
    article.delete()
    session.flash({ success: `The article ${article.title} was deleted !` })
    return response.redirect().toRoute('blog.index')
  }
}
