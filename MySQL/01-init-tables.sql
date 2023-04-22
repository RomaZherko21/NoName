CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `surname` VARCHAR(50),
  `middle_name` VARCHAR(50),
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `tel_number` VARCHAR(20) UNIQUE,
  `job_title` VARCHAR(50),
  `gender` ENUM('man', 'woman'),
  `date_of_birth` DATE,
  `role` ENUM('admin', 'user') NOT NULL,
  `avatar` VARCHAR(255),
  `profile_background` VARCHAR(255),
  `native_country` VARCHAR(50),
  `native_city` VARCHAR(50),
  `residence_country` VARCHAR(50),
  `residence_city` VARCHAR(50),
  `card_number` VARCHAR(20),
  `name_on_card` VARCHAR(50),
  `valid_thru` VARCHAR(10),
  `cvv` VARCHAR(4),
  `is_email_verified` BOOLEAN,
  `is_phone_verified` BOOLEAN,
  `is_two_factor_auth_active` BOOLEAN,
  `is_sms_alerts_active` BOOLEAN,
  `is_email_alerts_active` BOOLEAN,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (`id`),
  INDEX `idx_name` (`name`)
);

CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `description` TEXT,
  `short_description` TEXT,
  `reading_time` INT,
  `created_at` TIMESTAMP,
  `image` VARCHAR(255),
  `user_id` INT NOT NULL,
  `genre_id` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`genre_id`) REFERENCES genres(`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `m2m_users_posts_likes` (
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`post_id`) REFERENCES posts(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `post_comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` TEXT,
  `created_at` TIMESTAMP,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`post_id`) REFERENCES posts(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_connections` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` ENUM('pending', 'decline', 'accept'),
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sender_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`recipient_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `chats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `chat_messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `TEXT` TEXT,
  `created_at` TIMESTAMP,
  `user_id` INT NOT NULL,
  `chat_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`chat_id`) REFERENCES chats(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS m2m_users_chats (
  `user_id` INT NOT NULL,
  `chat_id` INT NOT NULL,
  PRIMARY KEY (user_id, chat_id),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`chat_id`) REFERENCES chats(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- KANBAN
CREATE TABLE IF NOT EXISTS `kanban_boards` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `description` TEXT,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_columns` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `position` TINYINT,
  `board_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES kanban_boards(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `description` TEXT,
  `priority` ENUM('1', '2', '3', '4', '5'),
  `due_date` TIMESTAMP,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `column_id` INT NOT NULL,
  `created_by` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`column_id`) REFERENCES kanban_columns(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`created_by`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_subtasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `is_completed` BOOLEAN,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_task_attachments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255),
  `task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `kanban_task_tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `board_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES kanban_boards(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS m2m_kanban_tasks_tags (
  `task_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (task_id, tag_id),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES kanban_task_tags(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS m2m_kanban_users_tasks (
  `user_id` INT NOT NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (user_id, task_id),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- FILE MANAGER
CREATE TABLE IF NOT EXISTS `folders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `url` VARCHAR(255),
  `format` ENUM(
    'jpg',
    'gif',
    'png',
    'svg',
    'tif',
    'pdf',
    'docx',
    'html',
    'xlsx',
    'txt',
    'pptx'
  ),
  `size` BIGINT,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `folder_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`folder_id`) REFERENCES folders(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `folder_tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS m2m_folders_tags (
  `folder_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (folder_id, tag_id),
  FOREIGN KEY (`folder_id`) REFERENCES folders(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES folder_tags(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS m2m_users_folders (
  `folder_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (folder_id, user_id),
  FOREIGN KEY (`folder_id`) REFERENCES folders(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE
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