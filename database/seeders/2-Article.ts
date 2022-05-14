import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Article from 'App/Models/Article'
import { faker } from '@faker-js/faker'
import Category from 'App/Models/Category'

export default class ArticleSeeder extends BaseSeeder {
  public async run() {
    const articles: Article[] = []

    for (let i = 0; i < 50; i++) {
      const a = new Article()
      a.title = `The ${faker.word.adjective()} ${faker.word.noun()}`
      a.content = faker.random.words(300)
      a.categoryId = faker.helpers.arrayElement((await Category.all()).map((c) => c.id))
      a.online = faker.helpers.arrayElement([true, false])
      articles.push(a)
    }

    await Article.createMany(articles)
  }
}
