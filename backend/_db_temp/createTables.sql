-- /Ad/
CREATE  TABLE Ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  owner VARCHAR(100) NOT NULL,
  price INTEGER,
  picture VARCHAR(100),
  location VARCHAR(100),
  createdAt DATE,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES Category(id)
);
-- /Categories/
CREATE  TABLE Category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL
);

--                                                /POPULATION/
-- /Ad/
PRAGMA foreign_keys = ON;
INSERT INTO Ad (title, description, owner, price, imgUrl, location, createdAt, categoryId) 
VALUES 
("Super bike",    "Great state",  "Lukasz", 10,     "https://eu.wishbonedesign.com/cdn/shop/products/Wishbone_Bike_3n1_Original_Natural_High_800x.png?v=1626318598",   "Paris",    "2013-10-07 08:23:19.120Z", 2),
("Car",           "2010",         "Claire", 2000,   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLPNnYBNEFn3xu4AeSNk7C6PgH72jIlHoCg&usqp=CAU",   "Paris",    "2013-10-07 08:23:19.120Z", 1),
("Super car",     "2024",         "Ado",    11000,  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYXA2vHXJb-i052xlABBOhmIjd2dTYxHOEg&usqp=CAU",   "Lyon",     "2023-09-12 08:23:19.120Z", 1),
("Bike",          "Good state",   "Levy",   800,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_zXDxsKBMfaZLgJEykXsdAU8NlfJD4TnFudsCbLxo9_8jKkraASVXodmWX-9ATasSMc&usqp=CAU",   "Bordeaux", "2013-10-07 08:23:19.120Z", 2),
("Super bike",    "Super state",  "Roxana", 85,     "https://voltbikes.co.uk/images/e-bikes/infinity-ls-xt-hybrid-ebike-straight.jpg",   "Lyon",     "2013-10-07 08:23:19.120Z", 2),
("Laptop",        "Lenovo",       "Peter",  497,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlCWYYwn28ulnT4NC2qyXxo6UU83pnroYASQ&usqp=CAU",   "Bordeaux", "2013-10-07 08:23:19.120Z", 3),
("Super Laptop",  "Apple",        "Elton",  39,     "https://image.smythstoys.com/original/desktop/106567.jpg",   "Lyon",     "2013-10-07 08:23:19.120Z", 3),
("TV",            "Samsung",      "Susann", 1355,   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRt1tkoCEVZ2n7mY4e5SQIi7hRbdirTrlKQEcYx9xSOKY1deFDOBroXc7v9RiiNd3VItQ&usqp=CAU",   "Paris",    "2023-09-10 08:23:19.120Z", 3),
("Super TV",      "Good table",   "Tom",    277,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Dojc1YPrYodwJ69N7yGgbQyRGCJv-oXNjw&usqp=CAU",   "Bordeaux", "2013-05-20 00:00:00.000Z", 3),
("PS5",           "Good table",   "Luc",    300,    "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",  "Lyon",     "2022-03-29 00:00:00.000Z", 3),
("Super PS5",     "Good table",   "Kim",    500,    "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",  "Lyon",     "2023-12-06 00:00:00.000Z", 3),
("PS4",           "Good table",   "Bob",    257,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQ5S1BUUJKNaNlLxM--qBXK1gxHkcXNa_AA&usqp=CAU",  "Paris",    "2023-03-23 00:00:00.000Z", 3),
("Super PS4",     "Good table",   "Kevin",  357,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQ5S1BUUJKNaNlLxM--qBXK1gxHkcXNa_AA&usqp=CAU",  "Bordeaux", "2019-08-17 00:00:00.000Z", 3),
("PS3",           "Good table",   "Pam",    127,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HzyT6sIhKpmzXjC5mi73f1JgvbFvscwflA&usqp=CAU",  "Paris",    "2022-07-14 00:00:00.000Z", 3),
("Super PS3",     "Good table",   "Pet",    207,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HzyT6sIhKpmzXjC5mi73f1JgvbFvscwflA&usqp=CAU",  "Bordeaux", "2019-01-02 00:00:00.000Z", 3),
("PS2",           "Good table",   "Triss",  97,     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSfopg1JnSj-wht9cSt75HISxfHWKfpxwMQ&usqp=CAU",  "Paris",    "2023-09-22 00:00:00.000Z", 3),
("Super PS2",     "Good table",   "Sam",    117,    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSfopg1JnSj-wht9cSt75HISxfHWKfpxwMQ&usqp=CAU",  "Bordeaux", "2023-10-03 00:00:00.000Z", 3),
("PS1",           "Good table",   "Sue",    47,     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaeYaTDHVJEByKQdzpEY3vDegRAxqQJCQlsqRWp1JXtHOcM1ZmMcZZM-Ebau_HxTDATM&usqp=CAU",  "Paris",    "2019-11-09 00:00:00.000Z", 3),
("Super PS1",     "Good table",   "Lukas",  97,     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaeYaTDHVJEByKQdzpEY3vDegRAxqQJCQlsqRWp1JXtHOcM1ZmMcZZM-Ebau_HxTDATM&usqp=CAU",  "Lyon",     "2022-03-01 00:00:00.000Z", 3),
("Closet",        "Good table",   "Sam",    0,     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo5V_xZeOTrd-tOQLTOdEJJw7cGvqgHeMC1A&usqp=CAU",  "Paris",    "2022-01-30 00:00:00.000Z", 4);

SELECT * FROM Ad;

-- /Categories/
PRAGMA foreign_keys = ON;
INSERT INTO Category (name) 
VALUES ("Cars"),
("Bikes"),
("Technologies"),
("Furnitures"),
("Other1"),
("Other2"),
("Other3"),
("Other4");

SELECT * FROM Category;

-- /Tags/
PRAGMA foreign_keys = ON;
INSERT INTO Tag (name) 
VALUES ("Tag1"),
("Tag2"),
("Tag3"),
("Tag4");

SELECT * FROM Tag;




--
--EMTY TABLES
DELETE FROM Ad;

DELETE FROM Category;

DELETE FROM Ad_tags_tag;

DELETE FROM Tag;

-- DROP
DROP TABLE Ad;

DROP TABLE Category;

DROP TABLE Ad_tags_tag;

DROP TABLE Tag;
