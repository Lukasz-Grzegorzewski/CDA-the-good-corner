import db from "./db_sqlite";
import type { AdType, CategoryType } from "./types";

//ADS
export function getAllAds(): Promise<AdType[]> {
  return new Promise((resolve, reject) => {
    const ads: AdType[] = [];
    db.each(
      "SELECT * FROM Ad;",
      (err: Error | null, row: AdType) => {
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

//GET AD BY ID
export function getAdById(id: string): Promise<AdType> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM Ad WHERE id = $id;",
      { $id: id },
      (err: Error | null, row: AdType) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
}

//CATEGORIES
export function getAllCategories(): Promise<CategoryType[]> {
  return new Promise((resolve, reject) => {
    const categories: CategoryType[] = [];
    db.each(
      "SELECT * FROM Category;",
      (err: Error | null, row: CategoryType) => {
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

export function getCategoryById(id: string): Promise<CategoryType> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM Category WHERE id = $id;",
      { $id: id },
      (err: Error | null, row: CategoryType) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
}
