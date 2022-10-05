CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `surname` varchar(255),
  `middle_name` varchar(255),
  `gender` ENUM('man', 'woman'),
  `date_of_birth` DATE,
  `email` varchar(255) NOT NULL UNIQUE,
  `tel_number` varchar(255) UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL,
  `avatar` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (name, surname,middle_name,email,gender,date_of_birth, tel_number, password, role, avatar) 
VALUES
  ('Roma','Zherko','Tomas','admin@gmail.com','man','2000-04-21','+375-25-709-67-14', '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS', 'admin','1663318230996.png'),
  ('Adam','Keizer','David','adam@gmail.com','man','1995-12-01','+375-25-709-67-17', '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS', 'user','1663318230997.png'),
  ('Alexa','Richardson','William','lexa@gmail.com','woman','1991-08-13','+375-25-709-67-18', '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS', 'admin','1663318230998.png'),
  ('Cao','Yu','Mason','chao@gmail.com','man','1956-03-13','+375-25-709-67-19', '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS', 'user','1663318230999.png');

CREATE TABLE IF NOT EXISTS `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255),
  `description` text,
  `created_at` bigint,
  `image` varchar(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

INSERT INTO `posts` (user_id, name, description, created_at, image) 
VALUES
  (1,'What are articles?','Articles are words that define a noun as specific or unspecific. Consider the following examples:',1664011922672,'1663318230996.jpg'),
  (1,'Clothing','Clothing (also known as clothes, apparel, and attire) are items worn on the body. Typically, clothing is made of fabrics or textiles, but over time it has included garments made from animal skin and other thin sheets of materials and natural products found in the environment, put together. The wearing of clothing is mostly restricted to human beings and is a feature of all human societies. The amount and type of clothing worn depends on gender, body type, social factors, and geographic considerations. Garments cover the body, footwear covers the feet, gloves cover the hands, while hats and headgear cover the head. Eyewear and jewelry are not generally considered items of clothing, but play an important role in fashion and clothing as costume.',1662011922672,'1663318230997.jpg'),
  (2,'MacBook','The MacBook is a brand of Macintosh notebook computers designed and marketed by Apple Inc. that use Apples macOS operating system since 2006. It replaced the PowerBook and iBook brands during the Mac transition to Intel processors, announced in 2005. The current lineup consists of the MacBook Air (2008–present) and the MacBook Pro (2006–present). Two different lines simply named "MacBook" existed from 2006 to 2012 and 2015 to 2019.',1664611922672,'1663318230998.jpg'),
  (3,'Book','A book is a medium for recording information in the form of writing or images, typically composed of many pages (made of papyrus, parchment, vellum, or paper) bound together and protected by a cover.[1] The technical term for this physical arrangement is codex (plural, codices). In the history of hand-held physical supports for extended written compositions or records, the codex replaces its predecessor, the scroll. A single sheet in a codex is a leaf and each side of a leaf is a page.',1664491922672,'1663318230999.jpg');

CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150),
  `year` int,
  `quantity` int,
  PRIMARY KEY (`id`)
);

INSERT INTO `books` (name, year, quantity) 
VALUES
	('Eugene Onegin', 1985, 2),
	('The Tale of the Fisherman and the Fish', 1990, 3),
  ('Foundation and Empire', 2000, 5),
  ('Psychology of Programming', 1998, 1),
	('C++ Programming Language', 1996, 3),
  ('Course of Theoretical Physics', 1981, 12),
  ('The Art of Programming', 1993, 7);

CREATE TABLE IF NOT EXISTS `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150),
  PRIMARY KEY (`id`)
);

INSERT INTO `genres` (name) 
VALUES
	('Poetry'),
  ('Programming'),
  ('Psychology'),
  ('Science'),
  ('Classic'),
  ('Fiction');

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150),
  PRIMARY KEY (`id`)
);

INSERT INTO `authors` (name) 
VALUES
	('D. Whip'),
  ('A. Asimov'),
  ('D. Carnegie'),
  ('L.D. Landau'),
  ('E.M. Lifshitz'),
  ('B. Stroustrup'),
  ('A.S. Pushkin');

CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150),
  PRIMARY KEY (`id`)
);

INSERT INTO `subscribers` (name) 
VALUES
	('Ivanov I.I.'),
  ('Petrov P.P.'),
  ('Sidorov S.S.'),
  ('Sidorov S.S.');

CREATE TABLE IF NOT EXISTS `m2m_books_authors` (
  `book_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`book_id`, `author_id`),
  CONSTRAINT `Constr_m2m_books_authors_book_fk`
      FOREIGN KEY (`book_id`) REFERENCES books(`id`)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Constr_m2m_books_authors_author_fk`
      FOREIGN KEY (`author_id`) REFERENCES authors(`id`)
      ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `m2m_books_authors` (book_id, author_id) 
VALUES
	(1,7),
  (2,7),
  (3,2),
  (4,3),
  (4,6),
  (5,6),
  (6,5),
  (6,4),
  (7,1);

CREATE TABLE IF NOT EXISTS `m2m_books_genres` (
  `book_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`book_id`, `genre_id`),
  CONSTRAINT `Constr_m2m_books_genres_book_fk`
      FOREIGN KEY (`book_id`) REFERENCES books(`id`)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Constr_m2m_books_genres_genre_fk`
      FOREIGN KEY (`genre_id`) REFERENCES genres(`id`)
      ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `m2m_books_genres` (book_id, genre_id) 
VALUES
	(1,1),
	(1,5),
  (2,1),
  (2,5),
  (3,6),
  (4,2),
  (4,3),
  (5,2),
  (6,5),
  (7,2),
  (7,5);

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscriber_id` int NOT NULL,
  `book_id` int NOT NULL,
  `start` date,
  `finish` date,
  `is_active` ENUM('Y', 'N'),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`subscriber_id`) REFERENCES subscribers(`id`),
  FOREIGN KEY (`book_id`) REFERENCES books(`id`)
);

INSERT INTO `subscriptions` (subscriber_id, book_id, start, finish, is_active) 
VALUES
	(1, 3, '2011-01-12', '2011-02-12', 'N'),
	(1, 1, '2011-01-12', '2011-02-12', 'N'),
	(3, 3, '2012-05-17', '2012-07-17', 'Y'),
	(1, 2, '2012-06-11', '2012-08-11', 'N'),
	(4, 5, '2012-06-11', '2012-08-11', 'N'),
	(1, 7, '2014-08-03', '2014-10-03', 'N'),
	(3, 5, '2014-08-03', '2014-10-03', 'Y'),
	(3, 1, '2014-08-03', '2014-09-03', 'Y'),
	(4, 1, '2015-10-07', '2015-03-07', 'Y'),
	(1, 4, '2015-10-07', '2015-11-07', 'N'),
	(4, 4, '2015-10-08', '2025-11-08', 'Y');


  -- SELECT COUNT(DISTINCT m2m_books_genres.book_id) AS total FROM m2m_books_genres   7 посчитать всех по book_id без повторов
  -- SELECT COUNT(m2m_books_genres.book_id) AS total FROM m2m_books_genres    11 посчитать всех по book_id c повторами
  -- SELECT SUM(quantity) as total_books, MIN(quantity) as min_copies_of_book, MAX(quantity) as max_copies_of_book, AVG(quantity) as avg_copies_of_book FROM books   33, 1, 12
  -- SELECT * FROM `subscriptions` WHERE start >='2011-01-01' AND finish < '2014-01-01' от 2011 до 2013 года
  -- SELECT name, quantity FROM `books` AS external WHERE quantity> ALL(SELECT quantity FROM books AS internal WHERE external.id != internal.id)  выбрать книгу с максимальным количеством копий
  -- SELECT YEAR(start) as year, COUNT(id) as books_taken FROM subscriptions GROUP BY year ORDER BY year     посчитать количество всех подписок по годам

-- SELECT books.name as b_name, authors.name as a_name, genres.name as g_name   Взять инфу о книгах авторах и жанре из 3ех таблиц
-- FROM `books` 
--     	JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
--       JOIN authors ON authors.id = m2m_books_authors.author_id
--     	JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
--       JOIN genres ON genres.id = m2m_books_genres.genre_id


-- SELECT books.name as book, GROUP_CONCAT(authors.name ORDER BY authors.name SEPARATOR ', ') as `authors`  Взять инфу о книгах и авторах из 2ух таблиц соеденив всех авторов для книги
-- FROM `books` 
--     	JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
--       	JOIN authors ON authors.id = m2m_books_authors.author_id
--  GROUP BY books.id
-- ORDER BY books.name

-- SELECT books.name as book,   Взять инфу о книгах, авторах и жанрах из 3ех таблиц соеденив всех авторов и жанры для одной книги
-- GROUP_CONCAT(DISTINCT authors.name ORDER BY authors.name SEPARATOR ', ') as `authors`, 
-- GROUP_CONCAT(DISTINCT genres.name ORDER BY genres.name SEPARATOR ', ') as `genres`
-- FROM `books` 
--     	JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
--       	JOIN authors ON authors.id = m2m_books_authors.author_id
--         JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
--       	JOIN genres ON genres.id = m2m_books_genres.genre_id
--  GROUP BY books.id
-- ORDER BY books.name