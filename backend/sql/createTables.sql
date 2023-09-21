--                                                /CREATE/

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
INSERT INTO Ad (title, description, owner, price, picture, location, createdAt, category_id) 
VALUES 
("Super bike",    "Great state",  "Lukasz", 10,     "picture1",   "Paris",    "2013-10-07 08:23:19.120Z", 2),
("Car",           "2010",         "Claire", 2000,   "picture2",   "Paris",    "2013-10-07 08:23:19.120Z", 1),
("Super car",     "2024",         "Ado",    11000,  "picture3",   "Lyon",     "2023-09-12 08:23:19.120Z", 1),
("Bike",          "Good state",   "Levy",   800,    "picture4",   "Bordeaux", "2013-10-07 08:23:19.120Z", 2),
("Super bike",    "Super state",  "Roxana", 85,     "picture5",   "Lyon",     "2013-10-07 08:23:19.120Z", 2),
("Laptop",        "Lenovo",       "Peter",  497,    "picture6",   "Bordeaux", "2013-10-07 08:23:19.120Z", 3),
("Super Laptop",  "Apple",        "Elton",  39,     "picture7",   "Lyon",     "2013-10-07 08:23:19.120Z", 3),
("TV",            "Samsung",      "Susann", 1355,   "picture8",   "Paris",    "2023-09-10 08:23:19.120Z", 3),
("Super TV",      "Good table",   "Tom",    277,    "picture9",   "Bordeaux", "2013-05-20 00:00:00.000Z", 3),
("PS5",           "Good table",   "Luc",    300,    "picture10",  "Lyon",     "2022-03-29 00:00:00.000Z", 3),
("Super PS5",     "Good table",   "Kim",    500,    "picture11",  "Lyon",     "2023-12-06 00:00:00.000Z", 3),
("PS4",           "Good table",   "Bob",    257,    "picture14",  "Paris",    "2023-03-23 00:00:00.000Z", 3),
("Super PS4",     "Good table",   "Kevin",  357,    "picture15",  "Bordeaux", "2019-08-17 00:00:00.000Z", 3),
("PS3",           "Good table",   "Pam",    127,    "picture12",  "Paris",    "2022-07-14 00:00:00.000Z", 3),
("Super PS3",     "Good table",   "Pet",    207,    "picture13",  "Bordeaux", "2019-01-02 00:00:00.000Z", 3),
("PS2",           "Good table",   "Triss",  97,     "picture16",  "Paris",    "2023-09-22 00:00:00.000Z", 3),
("Super PS2",     "Good table",   "Sam",    117,    "picture17",  "Bordeaux", "2023-10-03 00:00:00.000Z", 3),
("PS1",           "Good table",   "Sue",    47,     "picture18",  "Paris",    "2019-11-09 00:00:00.000Z", 3),
("Super PS1",     "Good table",   "Lukas",  97,     "picture19",  "Lyon",     "2022-03-01 00:00:00.000Z", 3),
("Closet",        "Good table",   "Sam",    57,     "picture20",  "Paris",    "2022-01-30 00:00:00.000Z", 4);

SELECT * FROM Ad;

-- /Categories/
PRAGMA foreign_keys = ON;
INSERT INTO Category (name) 
VALUES ("Cars"),
("Bikes"),
("Technologies"),
("Furnitures");


--
--EMTY TABLES
PRAGMA foreign_keys = ON;
DELETE FROM Ad;

PRAGMA foreign_keys = ON;
DELETE FROM Category;

-- DROP
PRAGMA foreign_keys = ON;
DROP TABLE Ad;

PRAGMA foreign_keys = ON;
DROP TABLE Category;
