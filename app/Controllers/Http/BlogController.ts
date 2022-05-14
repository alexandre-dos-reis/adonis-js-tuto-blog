import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Article from 'App/Models/Article'
import Category from 'App/Models/Category'
import ArticleValidator from 'App/Validators/ArticleValidator'

export default class BlogController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 8

    // const articles = await Article.query().preload('category')
    const categories = await Category.all()
    const articles = await Database.from(Article.table).paginate(page, limit)
    return view.render('blog/index', {
      articles,
      categories,
    })
  }

  public async createArticle({ view, request, response, session }: HttpContextContract) {
    const article = new Article()
    const categories = await Category.query().orderBy('name')

    if (request.method() === 'POST') {
      const data = await request.validate(ArticleValidator)
      article.merge({ ...data, online: data.online || false }).save()
      session.flash({ success: `The article ${article.title} was created !` })
      return response.redirect().toRoute('blog.index')
    }

    return view.render('blog/createArticle', {
      article,
      categories,
    })
  }

  public async updateArticle({ view, params, request, response, session }: HttpContextContract) {
    const article = await Article.findOrFail(params.id)
    const categories = await Category.query().orderBy('name')

    if (request.method() === 'POST') {
      const data = await request.validate(ArticleValidator)
      article.merge({ ...data, online: data.online || false }).save()
      session.flash({ success: `The article ${article.title} was updated !` })
      return response.redirect().toRoute('blog.index')
    }

    return view.render('blog/editArticle', {
      article,
      categories,
    })
  }

  public async deleteArticle({ params, response, session }: HttpContextContract) {
    const article = await Article.findOrFail(params.id)
    article.delete()
    session.flash({ success: `The article ${article.title} was deleted !` })
    return response.redirect().toRoute('blog.index')
  }
}
