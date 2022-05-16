import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Article from 'App/Models/Article'

export default class AddSlugToArticles extends BaseSchema {
  protected tableName = Article.table

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('slug').notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('slug')
    })
  }
}
