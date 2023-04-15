CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `surname` varchar(255),
  `middle_name` varchar(255),
  `email` varchar(255) NOT NULL UNIQUE,
  `tel_number` varchar(255) UNIQUE,
  `job_title` varchar(255),
  `gender` ENUM('man', 'woman'),
  `date_of_birth` DATE,
  `role` ENUM('admin', 'user') NOT NULL,
  `avatar` varchar(255),
  `profile_background` varchar(255),
  `native_country` varchar(255),
  `native_city` varchar(255),
  `residence_country` varchar(255),
  `residence_city` varchar(255),
  `card_number` varchar(255),
  `name_on_card` varchar(255),
  `valid_thru` varchar(255),
  `cvv` varchar(255),
  `is_email_verified` BOOLEAN,
  `is_phone_verified` BOOLEAN,
  `is_two_factor_auth_active` BOOLEAN,
  `is_sms_alerts_active` BOOLEAN,
  `is_email_alerts_active` BOOLEAN,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `genre_id` int,
  `name` varchar(255),
  `description` text,
  `short_description` text,
  `reading_time` int,
  `created_at` bigint,
  `image` varchar(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`),
  FOREIGN KEY (`genre_id`) REFERENCES genres(`id`)
);

CREATE TABLE IF NOT EXISTS `m2m_users_posts_likes` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`),
  CONSTRAINT `Constr_m2m_users_posts_likes_user_fk` FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Constr_m2m_users_posts_likes_post_fk` FOREIGN KEY (`post_id`) REFERENCES posts(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

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

CREATE TABLE IF NOT EXISTS `user_connections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` ENUM('pending', 'decline', 'accept'),
  `sender_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sender_id`) REFERENCES users(`id`),
  FOREIGN KEY (`recipient_id`) REFERENCES users(`id`)
);

CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `chat_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text,
  `created_at` bigint,
  `user_id` int NOT NULL,
  `chat_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`),
  FOREIGN KEY (`chat_id`) REFERENCES chats(`id`)
);

CREATE TABLE IF NOT EXISTS m2m_users_chats (
  user_id INT NOT NULL,
  chat_id INT NOT NULL,
  PRIMARY KEY (user_id, chat_id),
  CONSTRAINT `Constr_m2m_users_chats_user_fk` FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Constr_m2m_users_chats_chat_fk` FOREIGN KEY (`chat_id`) REFERENCES chats(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- KANBAN
CREATE TABLE IF NOT EXISTS `kanban_boards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` text,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_columns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `position` int,
  `board_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES kanban_boards(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` text,
  `priority` ENUM('1', '2', '3', '4', '5'),
  `due_date` TIMESTAMP,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `column_id` int NOT NULL,
  `created_by` int NOT NULL,
  `assigned_to` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`column_id`) REFERENCES kanban_columns(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`column_id`) REFERENCES kanban_columns(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`) REFERENCES users(`id`),
  FOREIGN KEY (`assigned_to`) REFERENCES users(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_subtasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `is_completed` BOOLEAN,
  `task_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_task_attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255),
  `task_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_task_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `board_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES kanban_boards(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS m2m_kanban_tasks_tags (
  task_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (task_id, tag_id),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES kanban_task_tags(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS m2m_kanban_users_tasks (
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  PRIMARY KEY (user_id, task_id),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

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