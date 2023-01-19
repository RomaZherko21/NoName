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

CREATE TABLE IF NOT EXISTS `m2m_users_posts_likes` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`),
  CONSTRAINT `Constr_m2m_users_posts_likes_user_fk`
      FOREIGN KEY (`user_id`) REFERENCES users(`id`)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Constr_m2m_users_posts_likes_post_fk`
      FOREIGN KEY (`post_id`) REFERENCES posts(`id`)
      ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `m2m_users_posts_likes` (user_id, post_id) 
VALUES
	(1,1),
  (1,2),
  (1,3),
  (2,1),
  (2,2),
  (2,3),
  (2,4),
  (3,2),
  (4,4);

CREATE TABLE IF NOT EXISTS `post_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `created_at` bigint,
   `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`post_id`) REFERENCES posts(`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

INSERT INTO `post_comments` (user_id, post_id, message, created_at) 
VALUES
	(1, 1, 'So deep...1', 1664011922672),
	(1, 2, 'So deep...2', 1664022922672),
	(1, 3, 'So deep...3', 1664019922672),
	(2, 1, 'So deep...4', 1664088922672),
	(2, 2, 'So deep...5', 1664014922672),
	(2, 2, 'So deep...6', 1664014922672),
	(3, 1, 'So deep...7', 1664011922672),
	(3, 2, 'So deep...8', 1664017722672),
	(4, 4, 'So deep...8', 1664017722672),
	(4, 4, 'So deep...8', 1664017722672);


CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `publisher` varchar(255),
  `description` text,
  `year` int,
  `quantity` int,
  PRIMARY KEY (`id`)
);

INSERT INTO `books` (name, year, quantity,publisher, description) 
VALUES
	('Eugene Onegin', 1985, 2,'HarperCollins', 'Onegin is the original superfluous man, a character type common in 19th-century Russian literature. He is a disillusioned aristocrat who is drawn into tragic situations through his inability or unwillingness to take positive action to prevent them.'),
	('The Tale of the Fisherman and the Fish', 1990, 3,'Workman', 'In Pushkins poem, an old man and woman have been living poorly for many years. They have a small hut, and every day the man goes out to fish. One day, he throws in his net and pulls out seaweed two times in succession, but on the third time he pulls out a golden fish.'),
  ('Foundation and Empire', 2000, 5,'Simon & Schuster', 'Foundation and Empire is a science fiction novel by American writer Isaac Asimov originally published by Gnome Press in 1952. It is the second book in the Foundation Series, and the fourth in the in-universe chronology. It takes place in two parts, originally published as separate novellas. The second part, "The Mule," won a Retro Hugo Award in 1996.'),
  ('Psychology of Programming', 1998, 1,'HarperCollins', 'The psychology of programming (PoP) is the field of research that deals with the psychological aspects of writing programs (often computer programs). The field has also been called the empirical studies of programming (ESP).'),
	('C++ Programming Language', 1996, 3,'HarperCollins', 'C++ is an object-oriented programming (OOP) language that is viewed by many as the best language for creating large-scale applications. C++ is a superset of the C language. A related programming language, Java, is based on C++ but optimized for the distribution of program objects in a network such as the Internet.'),
  ('Course of Theoretical Physics', 1981, 12, 'Hachette Book Group', 'The Course of Theoretical Physics is a ten-volume series of books covering theoretical physics that was initiated by Lev Landau and written in collaboration with his student Evgeny Lifshitz starting in the late 1930s. It is said that Landau composed much of the series in his head while in an NKVD prison in 1938–1939.'),
  ('The Art of Programming', 1993, 7,'HarperCollins', 'The Art of Computer Programming (TAOCP) is a comprehensive monograph written by the computer scientist Donald Knuth presenting programming algorithms and their analysis. Volumes 1–5 are intended to represent the central core of computer programming for sequential machines.');

CREATE TABLE IF NOT EXISTS `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  PRIMARY KEY (`id`)
);

INSERT INTO `genres` (name) 
VALUES
	('Poetry'),
  ('Programming'),
  ('Psychology'),
  ('Science'),
  ('Classic'),
  ('Fantasy'),
  ('Science Fiction'),
  ('Dystopian'),
  ('Action & Adventure'),
  ('Mystery'),
  ('Horror'),
  ('Thriller & Suspense'),
  ('Historical Fiction'),
  ('Romance'),
  ('Contemporary Fiction'),
  ('Fiction');

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `surname` varchar(255),
  `description` text,
  `date_of_birth` DATE,
  `date_of_death` DATE,
  PRIMARY KEY (`id`)
);

INSERT INTO `authors` (name, surname,date_of_birth,date_of_death, description) 
VALUES
	('Ducke','Whip','1902-04-03','1952-04-13', 'The responsibilities of an author include writing original stories for novels, plays, television scripts, and movies. Authors also write journals, develop story elements, and rewrite and revise pieces written by other writers.'),
  ('Isaac', 'Asimov','1903-03-05','1953-02-16','Isaac Asimov, (born January 2, 1920, Petrovichi, Russia—died April 6, 1992, New York, New York, U.S.), American author and biochemist, a highly successful and prolific writer of science fiction and of science books for the layperson.'),
  ('Dale','Carnegie','1904-12-07','1966-03-15','Scottish-born Andrew Carnegie (1835-1919) was an American industrialist who amassed a fortune in the steel industry then became a major philanthropist. Carnegie worked in a Pittsburgh cotton factory as a boy before rising to the position of division superintendent of the Pennsylvania Railroad in 1859.'),
  ('Candice','Landau','1905-09-08','1999-11-21','Noun. landau (plural landaus) A type of lightweight, four-wheeled carriage in which the front and back passenger seats face each other.'),
  ('Mikhail','Lifshitz','1915-07-01','1985-04-22','Reading the descriptions of Lifshitz, both as a person and as a scientist, that have been written since his death one is struck with the large variation in them'),
  ('Bjarne','Stroustrup','1950-02-02',NULL,'Bjarne Stroustrup is a Danish computer scientist, most notable for the invention and development of the C++ programming language. As of July 2022, Stroustrup is a professor of Computer Science at Columbia University.'),
  ('Alexander','Pushkin','1799-03-14','1837-01-11','Was a Russian poet, playwright, and novelist of the Romantic era. He is considered by many to be the greatest Russian poet and the founder of modern Russian literature.');

CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `surname` varchar(255),
  `middle_name` varchar(255),
  `date_of_birth` DATE,
  `tel_number` varchar(255) UNIQUE,
  PRIMARY KEY (`id`)
);

INSERT INTO `subscribers` (name, surname, middle_name, date_of_birth, tel_number) 
VALUES
	('Mark','Vega','Matthew', '2003-04-21','+375-25-701-55-14'),
  ('Webb','Anthony','Windrow','1999-02-05','+375-25-702-56-21'),
  ('George','Schultz','Willard','1980-09-09','+375-25-703-57-22'),
  ('Austin','Hunter','Chapman','1994-11-12','+375-25-704-58-23');

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
  `is_active` boolean,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`subscriber_id`) REFERENCES subscribers(`id`),
  FOREIGN KEY (`book_id`) REFERENCES books(`id`)
);

INSERT INTO `subscriptions` (subscriber_id, book_id, start, finish, is_active) 
VALUES
	(1, 3, '2011-01-12', '2011-02-12', false),
	(1, 1, '2011-01-12', '2011-02-12', false),
	(3, 3, '2012-05-17', '2012-07-17', true),
	(1, 2, '2012-06-11', '2012-08-11', false),
	(4, 5, '2012-06-11', '2012-08-11', false),
	(1, 7, '2014-08-03', '2014-10-03', false),
	(3, 5, '2014-08-03', '2014-10-03', true),
	(3, 1, '2014-08-03', '2014-09-03', true),
	(4, 1, '2015-10-07', '2015-03-07', true),
	(1, 4, '2015-10-07', '2015-11-07', false),
	(4, 4, '2015-10-08', '2025-11-08', true);


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



-- Выбрать всех name и id с данными, сджоинить с таблицей subscriptions, если нет совпадений то у таблицы справа будут null значения. В конце показать только с null знрачениями
-- SELECT subscribers.name as s_name, subscribers.id as s_id  
-- FROM subscribers 
--     	LEFT JOIN subscriptions ON subscribers.id = subscriptions.subscriber_id
-- WHERE subscriptions.subscriber_id IS NULL

-- IN работает быстрее чем JOIN, Выбирает name и id у тех у кого хоть одна подписка
-- SELECT subscribers.name as s_name, subscribers.id as s_id  
-- 	FROM subscribers 
-- WHERE  subscribers.id IN (SELECT DISTINCT subscriptions.subscriber_id FROM subscriptions)



--  Выбрать всех name и id с данными, сджоинить с таблицей subscriptions, если нет совпадений то у таблицы справа будут null значения. Преобразовать все "Y" в NULL, Оставить поля только NULL
-- SELECT subscribers.name, subscribers.id
-- FROM subscribers 
--     	LEFT OUTER JOIN subscriptions ON subscribers.id = subscriptions.subscriber_id
-- GROUP BY subscribers.id
-- HAVING COUNT(IF(subscriptions.is_active = "Y", subscriptions.is_active, NULL)) = 0


-- Выбрать книги по жанрам 'Programming' и 'Psychology' (можно так же по id жанра без 2ого IN)
-- SELECT DISTINCT books.id, books.name 
-- FROM books 
--   JOIN m2m_books_genres ON m2m_books_genres.book_id = books.id 
-- WHERE m2m_books_genres.genre_id IN (SELECT id FROM genres WHERE genres.name IN ('Programming', 'Psychology'))
-- ORDER BY books.name ASC


-- INSERT добавление в базу (перезаписывпние при схожести данных (первичных ключей))
-- DELETE удаление
-- UPDATE Обновление
-- REPLACE Обновление (если есть строка с таким же первичным ключом) или создание новой строки с новым первичным ключом