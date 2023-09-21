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
SELECT a.*, c.name AS category FROM Ad a
LEFT JOIN Category c ON c.id = a.category_id
WHERE a.owner = "Sam";

SELECT c.name AS category, a.* FROM Ad a
LEFT JOIN Category c ON c.id = a.category_id
WHERE c.id = 1;

