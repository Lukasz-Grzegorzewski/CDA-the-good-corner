import db from "./db";
import type { Ad, Category, AdsWithCategoryName } from "./types";

//ADS
export function getAllAds(): Promise<Ad[]> {
  return new Promise((resolve, reject) => {
    const ads: Ad[] = [];
    db.each(
      "SELECT * FROM Ad;",
      (err: Error | null, row: Ad) => {
        if (err) {
          reject(err);
        }
        ads.push(row);
      },
      () => {
        resolve(ads);
      }
    );
  });
}

export function getAllAdsByCategory(
  id: string
): Promise<AdsWithCategoryName[]> {
  return new Promise((resolve, reject) => {
    const adWithCatefory: AdsWithCategoryName[] = [];
    let query: string =
      "SELECT c.name, a.*  FROM Ad a JOIN Category c ON c.id = $id;";
      console.log("ssvc");
      
    db.each(
      query,
      {
        $id: id,
      },
      (err: Error | null, row: AdsWithCategoryName) => {
        if (err) {
          reject(err);
        }
        adWithCatefory.push(row);
      },
      () => {
        resolve(adWithCatefory);
      }
    );
  });
}

//GET AD BY ID
export function getAdById(id: string): Promise<Ad> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM Ad WHERE id = $id;",
      { $id: id },
      (err: Error | null, row: Ad) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
}

//CATEGORIES
export function getAllCategories(): Promise<Category[]> {
  return new Promise((resolve, reject) => {
    const categories: Category[] = [];
    db.each(
      "SELECT * FROM Category;",
      (err: Error | null, row: Category) => {
        if (err) {
          reject(err);
        }
        categories.push(row);
      },
      () => {
        resolve(categories);
      }
    );
  });
}

export function getCategoryById(id: string): Promise<Category> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM Category WHERE id = $id;",
      { $id: id },
      (err: Error | null, row: Category) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
}
