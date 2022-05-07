import Route from '@ioc:Adonis/Core/Route'
import './routes/article'

Route.on('/').redirect('blog.index').as('home')
Route.get('/contact', 'ContactController.index').as('contact.index')
