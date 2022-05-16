import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  beforeSave,
  beforeUpdate,
} from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public slug: string

  @column()
  public content: string

  @column()
  public online: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @beforeSave()
  @beforeUpdate()
  public static async createSlug(article: Article) {
    article.slug = article.title.toLowerCase().replace(/ /g, '-')
  }
}
