import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'
import { faker } from '@faker-js/faker'

export default class CategorySeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const categories: Category[] = []

    for (let i = 0; i < 10; i++) {
      const c = new Category()
      c.name = faker.word.noun()
      c.slug = c.name.toLowerCase().replace(/ /g, '-')
      categories.push(c)
    }

    await Category.createMany(categories)
  }
}
