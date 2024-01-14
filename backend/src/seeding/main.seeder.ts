import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";
import { User } from "../entities/User";

const args = process.argv.slice(2); // Get command line arguments
const [numCategories = 10, numTags = 20, numAds = 30, numUsers = 30] =
  args.map(Number);
console.table({
  "Category seeds :": numCategories,
  "Tag seeds :": numTags,
  "Ads seeds :": numAds,
  "Users seeds :": numUsers,
});

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const categoryFactory = factoryManager.get(Category);
    const tagsFactory = factoryManager.get(Tag);
    const adsFactory = factoryManager.get(Ad);
    const usersFactory = factoryManager.get(User);

    const categories = await categoryFactory.saveMany(numCategories);
    const tags = await tagsFactory.saveMany(numTags);
    const ads = await adsFactory.saveMany(numAds);
    const users = await usersFactory.saveMany(numUsers);

    // giving random category, tags and createdBy to ads
    for (const ad of ads) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomTags = tags.filter(() => Math.random() < 0.2);
      const randomCreatedBy = users[Math.floor(Math.random() * users.length)];

      ad.category = randomCategory;
      ad.tags = randomTags;
      ad.createdBy = randomCreatedBy;
      await ad.save();
    }

    // giving random number of ads to random users
    let adsTemp = [...ads];
    adsTemp.sort(() => Math.random() - 0.5);

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (i > 1) {
        const role =
          Math.random() > 0.3
            ? "SUBSCRIBED"
            : Math.random() < 0.2
            ? "NONSUBSCRIBED"
            : "BANNED";
        user.role = role;
      } else if (i === 1) user.role = "ADMIN";
      else if (i === 0) user.role = "SUPERADMIN";

      if (adsTemp.length > 0) {
        const numberOfAds = Math.floor(Math.random() * (adsTemp.length + 1));
        user.ads.push(...adsTemp.splice(0, numberOfAds));

        if (i === users.length - 1 && adsTemp.length > 0) {
          users[users.length - 1].ads.push(...adsTemp);
          adsTemp = [];
        }
      }

      await user.save();
    }
  }
}
