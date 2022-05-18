import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'

export default class EmailUniqueForUsers extends BaseSchema {
  protected tableName = User.table

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['email'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['email'])
    })
  }
}
