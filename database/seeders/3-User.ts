import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Logger from '@ioc:Adonis/Core/Logger'

export default class CategorySeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const email = 'admin@gmail.com'
    const password = 'admin'

    await User.create({
      email,
      password,
    })

    Logger.info(
      `A user was created with the following credentials. Email: ${email}, password: ${password}`
    )
  }
}
