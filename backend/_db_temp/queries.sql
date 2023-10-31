--                                    /ADS/
SELECT * FROM Ad;

-- DELETE
PRAGMA foreign_keys = ON;
DELETE FROM Ad
WHERE price > 40;

-- → Mettre à jour les annonces du 1er Septembre avec un prix à 0€
PRAGMA foreign_keys = ON;
UPDATE Ad SET price = 0
WHERE createdAt >= "2023-09-01";

-- → Afficher la moyenne des prix des annonces de la ville de Paris
SELECT AVG(price) AS "Average Paris price" FROM Ad
WHERE location = "Paris";

-- → BONUS : Afficher la moyenne des prix des annonces par ville
SELECT AVG(price) AS "Average Paris price", location FROM Ad
GROUP BY location;

--                                    /CATEGORIES/
SELECT * FROM Category;

-- /Ad - Categories/
SELECT c.name AS category, a.* FROM Ad a
LEFT JOIN Category c ON c.id = a.categoryId;


SELECT "category"."name" AS category, ad.* 
FROM "ad" "ad" 
LEFT JOIN "category" "category" 
ON "ad"."categoryId" = "category"."id" 
WHERE "ad"."categoryId" = 2;

SELECT "ad"."id" AS "ad_id", "ad"."title" AS "ad_title", "ad"."description" AS "ad_description", "ad"."owner" AS
"ad_owner", "ad"."price" AS "ad_price", "ad"."picture" AS "ad_picture", "ad"."location" AS "ad_location",
"ad"."createdAt" AS "ad_createdAt", "ad"."categoryId" AS "ad_categoryId", "category"."id" AS "category_id",
"category"."name" AS "category_name" FROM "ad" "ad" LEFT JOIN "category" "category" ON "ad"."categoryId" =
"category"."id" WHERE "ad"."categoryId" = 3;


-- ALL TABLES
.table