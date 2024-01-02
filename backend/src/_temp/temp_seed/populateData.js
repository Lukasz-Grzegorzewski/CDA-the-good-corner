const { Client } = require("pg");

const connectionOptions = {
  host: "127.0.0.1",
  port: 5433,
  user: "user",
  password: "pass",
  database: "thegoodcorner",
};

const client = new Client(connectionOptions);

const initializeConnection = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");

    await insertData();

    await client.end(); // Don't forget to close the connection when done
    console.log("Connection closed");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

const insertData = async () => {
  try {

    await client.query(`
    INSERT INTO tag (name) VALUES
    ('Blue'),
    ('Red'),
    ('White'),
    ('Second hand'),
    ('New'),
    ('Good state'),
    ('Perfect state');
    `);

    await client.query(`
    INSERT INTO category (name) VALUES
    ('Bikes'),
    ('Technologies'),
    ('Furnitures'),
    ('Emploi'),
    ('Mode'),
    ('Maison & Jardin'),
    ('Famille'),
    ('Électronique'),
    ('Loisirs'),
    ('Autres');
    `);

    await client.query(`
    INSERT INTO ad (title, description, owner, price, imgurl, location, "categoryId") VALUES
    ('Super bike', 'Great state', 'Lukasz@gmail.com', 10, 'https://eu.wishbonedesign.com/cdn/shop/products/Wishbone_Bike_3n1_Original_Natural_High_800x.png?v=1626318598', 'Paris', 2),
    ('Car', '2010', 'Claire@gmail.com', 2000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLPNnYBNEFn3xu4AeSNk7C6PgH72jIlHoCg&usqp=CAU', 'Paris', 1),
    ('Super car', '2024', 'Ado@gmail.com', 11000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYXA2vHXJb-i052xlABBOhmIjd2dTYxHOEg&usqp=CAU', 'Lyon', 1),
    ('Bike', 'Good state', 'Levy@gmail.com', 800, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_zXDxsKBMfaZLgJEykXsdAU8NlfJD4TnFudsCbLxo9_8jKkraASVXodmWX-9ATasSMc&usqp=CAU', 'Bordeaux', 2),
    ('Super bike', 'Super state', 'Roxana@gmail.com', 85, 'https://voltbikes.co.uk/images/e-bikes/infinity-ls-xt-hybrid-ebike-straight.jpg', 'Lyon', 2),
    ('Laptop', 'Lenovo', 'Peter@gmail.com', 497, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlCWYYwn28ulnT4NC2qyXxo6UU83pnroYASQ&usqp=CAU', 'Bordeaux', 3),
    ('Super Laptop', 'Apple', 'Elton@gmail.com', 39, 'https://image.smythstoys.com/original/desktop/106567.jpg', 'Lyon', 3),
    ('TV', 'Samsung', 'Susann@gmail.com', 1355, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRt1tkoCEVZ2n7mY4e5SQIi7hRbdirTrlKQEcYx9xSOKY1deFDOBroXc7v9RiiNd3VItQ&usqp=CAU', 'Paris', 3),
    ('Super TV', 'Good table', 'Tom@gmail.com', 277, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Dojc1YPrYodwJ69N7yGgbQyRGCJv-oXNjw&usqp=CAU', 'Bordeaux', 3),
    ('PS5', 'Good table', 'Luc@gmail.com', 300, 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$', 'Lyon', 3),
    ('Super PS5', 'Good table', 'Kim@gmail.com', 500, 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$', 'Lyon', 3),
    ('PS4', 'Good table', 'Bob@gmail.com', 257, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQ5S1BUUJKNaNlLxM--qBXK1gxHkcXNa_AA&usqp=CAU', 'Paris', 3),
    ('Super PS4', 'Good table', 'Kevin@gmail.com', 357, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQ5S1BUUJKNaNlLxM--qBXK1gxHkcXNa_AA&usqp=CAU', 'Bordeaux', 3),
    ('PS3', 'Good table', 'Pam@gmail.com', 127, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HzyT6sIhKpmzXjC5mi73f1JgvbFvscwflA&usqp=CAU', 'Paris', 3),
    ('Super PS3', 'Good table', 'Pet@gmail.com', 207, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HzyT6sIhKpmzXjC5mi73f1JgvbFvscwflA&usqp=CAU', 'Bordeaux', 3),
    ('PS2', 'Good table', 'Triss@gmail.com', 97, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSfopg1JnSj-wht9cSt75HISxfHWKfpxwMQ&usqp=CAU', 'Paris', 3),
    ('Super PS2', 'Good table', 'Sam@gmail.com', 117, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSfopg1JnSj-wht9cSt75HISxfHWKfpxwMQ&usqp=CAU', 'Bordeaux', 3),
    ('PS1', 'Good table', 'Sue@gmail.com', 47, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaeYaTDHVJEByKQdzpEY3vDegRAxqQJCQlsqRWp1JXtHOcM1ZmMcZZM-Ebau_HxTDATM&usqp=CAU', 'Paris', 3),
    ('Super PS1', 'Good table', 'Lukas@gmail.com', 97, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaeYaTDHVJEByKQdzpEY3vDegRAxqQJCQlsqRWp1JXtHOcM1ZmMcZZM-Ebau_HxTDATM&usqp=CAU', 'Lyon', 3),
    ('Closet', 'Good table', 'Sam@gmail.com', 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo5V_xZeOTrd-tOQLTOdEJJw7cGvqgHeMC1A&usqp=CAU', 'Paris', 4);    
    `);

    await client.query(`
    INSERT INTO ad_tags_tag (adId, tagId) VALUES
    (1, 1),
    (2, 4),
    (3, 5),
    (4, 1),
    (5, 6),
    (6, 2),
    (7, 6),
    (8, 7),
    (9, 6),
    (10, 7),
    (11, 4),
    (12, 7),
    (13, 7),
    (14, 6),
    (15, 7),
    (16, 7),
    (17, 7),
    (18, 7),
    (19, 7),
    (20, 7),
    (21, 7),
    (22, 7),
    (23, 7),
    (24, 7),
    (25, 7);
    `);

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

const executeScript = async () => {
  await initializeConnection();
};

executeScript();