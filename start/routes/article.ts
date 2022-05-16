import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'BlogController.index').as('blog.index')

  Route.get('/create', 'BlogController.createArticle').as('blog.createArticle')
  Route.post('/create', 'BlogController.createArticle').as('blog.newArticle')

  Route.get('/edit/:id', 'BlogController.updateArticle').as('blog.editArticle')
  Route.post('/update/:id', 'BlogController.updateArticle').as('blog.updateArticle')

  Route.post('/delete/:id', 'BlogController.deleteArticle').as('blog.deleteArticle')

  Route.get('/:slug', 'BlogController.show').as('blog.show')
}).prefix('/article')
