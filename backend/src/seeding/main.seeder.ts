import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";

const args = process.argv.slice(2); // Get command line arguments
const [numCategories = 10, numTags = 20, numAds = 30] = args.map(Number);
console.log('Category seeds :', numCategories);
console.log('Tag seeds :', numTags);
console.log('Ads seeds :', numAds);


export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const categoryFactory = factoryManager.get(Category);
    const tagsFactory = factoryManager.get(Tag);
    const adsFactory = factoryManager.get(Ad);

    const categories = await categoryFactory.saveMany(numCategories);
    const tags = await tagsFactory.saveMany(numTags);
    const ads = await adsFactory.saveMany(numAds);

    for (const ad of ads) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomTags = tags.filter(() => Math.random() < 0.2);

      ad.category = randomCategory;
      ad.tags = randomTags;
      await ad.save();
    }
  }
}
