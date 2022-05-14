import Route from '@ioc:Adonis/Core/Route'
import './routes/article'
import './routes/category'

Route.on('/').redirect('blog.index').as('home')
Route.get('/contact', 'ContactController.index').as('contact.index')
Route.get('/login', 'LoginController.index').as('login.index')
