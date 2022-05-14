import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddingCategories extends BaseSchema {
  protected categoryTable = 'categories'
  protected articleTable = 'articles'

  public async up() {
    this.schema.createTable(this.categoryTable, (table) => {
      table.increments('id')
      table.string('name')
      table.string('slug')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable(this.articleTable, (table) => {
      table.integer('category_id').unsigned().references('categories.id').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.categoryTable)
    this.schema.alterTable(this.articleTable, (table) => {
      table.dropForeign('category_id')
    })
  }
}
