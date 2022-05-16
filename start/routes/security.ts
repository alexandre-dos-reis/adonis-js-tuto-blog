import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'SecurityController.login').as('login')
  Route.post('/', 'SecurityController.auth').as('auth')
}).prefix('/login')

Route.post('/logout', 'SecurityController.logout').as('logout')
