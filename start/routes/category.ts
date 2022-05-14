import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CategoryController.index').as('category.index')
}).prefix('/category')
