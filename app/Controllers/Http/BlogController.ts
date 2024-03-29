import { HttpContextContract as ctx } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import Category from 'App/Models/Category'
import ArticleValidator from 'App/Validators/ArticleValidator'
import { marked } from 'marked'

export default class BlogController {
  // https://stackoverflow.com/questions/57951785/adonis-js-pagination-with-dynamic-query-building
  async index({ view, request, auth }: ctx) {
    const queryArticles = Article.query().preload('category').orderBy('updatedAt', 'desc')

    if (auth.use('web').isGuest) {
      queryArticles.where('online', '=', true)
    }

    let articles = await queryArticles.paginate(request.input('page', 1), 8)

    articles.map((a) => {
      a.content = marked.parse(a.content, {
        gfm: true,
        breaks: true,
        sanitize: false, //https://marked.js.org/using_advanced
        smartLists: true,
        smartypants: false,
      })
    })

    return view.render('blog/index', {
      articles,
    })
  }

  async show({ view, params, response }: ctx) {
    let article = await Article.query().where('slug', '=', params.slug).first()

    if (article === null) {
      return response.notFound()
    }

    article.content = marked.parse(article.content, {
      gfm: true,
      breaks: true,
      sanitize: false, //https://marked.js.org/using_advanced
      smartLists: true,
      smartypants: false,
    })

    return view.render('blog/showArticle.edge', { article })
  }

  async createArticle({ view, request, response, session }: ctx) {
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

  async updateArticle({ view, params, request, response, session }: ctx) {
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

  async deleteArticle({ params, response, session }: ctx) {
    const article = await Article.findOrFail(params.id)
    article.delete()
    session.flash({ success: `The article ${article.title} was deleted !` })
    return response.redirect().toRoute('blog.index')
  }
}
