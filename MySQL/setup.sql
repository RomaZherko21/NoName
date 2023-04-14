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

INSERT INTO
  `users` (
    name,
    surname,
    middle_name,
    job_title,
    is_email_verified,
    is_phone_verified,
    is_two_factor_auth_active,
    is_sms_alerts_active,
    is_email_alerts_active,
    native_country,
    native_city,
    residence_country,
    residence_city,
    card_number,
    name_on_card,
    valid_thru,
    cvv,
    email,
    gender,
    date_of_birth,
    tel_number,
    password,
    role,
    avatar
  )
VALUES
  (
    'Tamaz',
    'Gela',
    'Gela',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'admin@gmail.com',
    'man',
    '1995-04-21',
    '+375257096714',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'admin',
    '1663318230996.png'
  ),
  (
    'Adam',
    'Keizer',
    'David',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'user@gmail.com',
    'man',
    '1995-12-01',
    '+375257096717',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '1663318230997.png'
  ),
  (
    'Alexa',
    'Richardson',
    'William',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'lexa@gmail.com',
    'woman',
    '1991-08-13',
    '+375257096718',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'admin',
    '1663318230998.png'
  ),
  (
    'Cao',
    'Yu',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'chao@gmail.com',
    'man',
    '1956-03-13',
    '+375257096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '1663318230999.png'
  ),
  (
    'Mila',
    'Kunis',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    '	mila@kunis.com',
    'man',
    '1966-03-13',
    '+375258096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521111.png'
  ),
  (
    'George',
    'Clooney',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'marlon@brando.com',
    'man',
    '1926-03-13',
    '+375259096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521112.png'
  ),
  (
    'Ryan',
    'Gossling',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'jack@nicholson',
    'man',
    '1936-03-13',
    '+375251096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521113.png'
  ),
  (
    'Badri',
    'Gabriel',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'humphrey@bogart.com',
    'man',
    '1936-03-13',
    '+375252096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521114.png'
  ),
  (
    'Revaz',
    'Imeda',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'spencer@tracy',
    'man',
    '1946-03-13',
    '+375253096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521115.png'
  ),
  (
    'Grigol',
    'Tornike',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'marlo2n@brando.com',
    'man',
    '1966-03-13',
    '+375254096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521116.png'
  ),
  (
    'Temur',
    'Lidia',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'lidia@brando.com',
    'man',
    '1976-03-13',
    '+375255096719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'admin',
    '167580521117.png'
  ),
  (
    'Tedore',
    'Merab',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'Merab@gmail.com',
    'man',
    '1976-03-13',
    '+375255196719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521118.png'
  ),
  (
    'Stepane',
    'Daviti',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'Daviti@gmail.com',
    'man',
    '2001-04-13',
    '+375255296719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521119.png'
  ),
  (
    'Keto',
    'Liana',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'Liana@gmail.com',
    'woman',
    '2005-05-13',
    '+375255396719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'user',
    '167580521121.png'
  ),
  (
    'Zurab',
    'Tamar',
    'Jr.',
    'Chief Accountant',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'AFG',
    'Kabul',
    'USA',
    'New York',
    '4062836884511050',
    'Xin Qian Jespersen',
    '04/2027',
    '575',
    'Tamar@gmail.com',
    'man',
    '2003-06-13',
    '+375255496719',
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS',
    'admin',
    '167580521122.png'
  );

CREATE TABLE IF NOT EXISTS `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  PRIMARY KEY (`id`)
);

INSERT INTO
  `genres` (name)
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

INSERT INTO
  `posts` (
    user_id,
    genre_id,
    name,
    reading_time,
    short_description,
    description,
    created_at,
    image
  )
VALUES
  (
    1,
    1,
    'What are articles?',
    10,
    'Articles are words that define a noun and else',
    'Articles are words that define a noun as specific or unspecific. Consider the following examples:',
    1664011922672,
    '1663318230996.jpg'
  ),
  (
    1,
    2,
    'Clothing',
    8,
    'Clothing (also known as clothes, apparel, and attire) are items and else',
    'Clothing (also known as clothes, apparel, and attire) are items worn on the body. Typically, clothing is made of fabrics or textiles, but over time it has included garments made from animal skin and other thin sheets of materials and natural products found in the environment, put together. The wearing of clothing is mostly restricted to human beings and is a feature of all human societies. The amount and type of clothing worn depends on gender, body type, social factors, and geographic considerations. Garments cover the body, footwear covers the feet, gloves cover the hands, while hats and headgear cover the head. Eyewear and jewelry are not generally considered items of clothing, but play an important role in fashion and clothing as costume.',
    1662011922672,
    '1663318230997.jpg'
  ),
  (
    2,
    3,
    'MacBook',
    40,
    'The MacBook is a brand of Macintosh notebook and else',
    'The MacBook is a brand of Macintosh notebook computers designed and marketed by Apple Inc. that use Apples macOS operating system since 2006. It replaced the PowerBook and iBook brands during the Mac transition to Intel processors, announced in 2005. The current lineup consists of the MacBook Air (2008–present) and the MacBook Pro (2006–present). Two different lines simply named "MacBook" existed from 2006 to 2012 and 2015 to 2019.',
    1664611922672,
    '1663318230998.jpg'
  ),
  (
    3,
    4,
    'Book',
    30,
    'A book is a medium for recording information and else',
    'A book is a medium for recording information in the form of writing or images, typically composed of many pages (made of papyrus, parchment, vellum, or paper) bound together and protected by a cover.[1] The technical term for this physical arrangement is codex (plural, codices). In the history of hand-held physical supports for extended written compositions or records, the codex replaces its predecessor, the scroll. A single sheet in a codex is a leaf and each side of a leaf is a page.',
    1664491922672,
    '1663318230999.jpg'
  ),
  (
    2,
    4,
    'Book',
    30,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1665491922672,
    '1663318230999.jpg'
  ),
  (
    1,
    4,
    'Book',
    40,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1666491922672,
    '1663318230999.jpg'
  ),
  (
    2,
    5,
    'Book',
    30,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1667491922672,
    '1663318230999.jpg'
  ),
  (
    3,
    6,
    'Book',
    40,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1668491922672,
    '1663318230999.jpg'
  ),
  (
    4,
    7,
    'Book',
    45,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1669491922672,
    '1663318230999.jpg'
  ),
  (
    5,
    8,
    'Book',
    30,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1671491922672,
    '1663318230999.jpg'
  ),
  (
    6,
    9,
    'Book',
    50,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1672491922672,
    '1663318230999.jpg'
  ),
  (
    7,
    10,
    'Book',
    10,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1667391922672,
    '1663318230999.jpg'
  ),
  (
    8,
    11,
    'Book',
    20,
    'A book is a medium for recording information and else',
    ' <head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>',
    1667491922672,
    '1663318230999.jpg'
  );

CREATE TABLE IF NOT EXISTS `m2m_users_posts_likes` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`),
  CONSTRAINT `Constr_m2m_users_posts_likes_user_fk` FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Constr_m2m_users_posts_likes_post_fk` FOREIGN KEY (`post_id`) REFERENCES posts(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO
  `m2m_users_posts_likes` (user_id, post_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (3, 2),
  (4, 4);

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

INSERT INTO
  `post_comments` (user_id, post_id, message, created_at)
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

CREATE TABLE IF NOT EXISTS `user_connections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` ENUM('pending', 'decline', 'accept'),
  `sender_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sender_id`) REFERENCES users(`id`),
  FOREIGN KEY (`recipient_id`) REFERENCES users(`id`)
);

INSERT INTO
  `user_connections` (sender_id, recipient_id, status)
VALUES
  (1, 2, 'accept'),
  (1, 3, 'decline'),
  (1, 4, 'pending'),
  (8, 1, 'pending'),
  (9, 1, 'decline'),
  (10, 1, 'decline'),
  (11, 1, 'accept'),
  (12, 1, 'accept'),
  (1, 13, 'decline'),
  (1, 14, 'accept'),
  (1, 15, 'pending'),
  (2, 3, 'decline'),
  (2, 4, 'pending'),
  (8, 2, 'pending'),
  (9, 2, 'decline'),
  (10, 2, 'decline'),
  (11, 2, 'accept'),
  (12, 2, 'accept'),
  (2, 13, 'decline'),
  (2, 14, 'accept'),
  (2, 15, 'pending'),
  (2, 4, 'accept'),
  (2, 3, 'pending'),
  (3, 4, 'pending');

CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

INSERT INTO
  `chats` (`name`, `created_at`, `updated_at`)
VALUES
  (
    'Chat 1',
    FLOOR(RAND() * 1640995200000),
    FLOOR(RAND() * 1640995200000)
  ),
  (
    'Chat 2',
    FLOOR(RAND() * 1640995200000),
    FLOOR(RAND() * 1640995200000)
  ),
  (
    'Chat 3',
    FLOOR(RAND() * 1640995200000),
    FLOOR(RAND() * 1640995200000)
  ),
  (
    'Chat 4',
    FLOOR(RAND() * 1640995200000),
    FLOOR(RAND() * 1640995200000)
  ),
  (
    'Chat 5',
    FLOOR(RAND() * 1640995200000),
    FLOOR(RAND() * 1640995200000)
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

INSERT INTO
  `chat_messages` (`text`, `created_at`, `user_id`, `chat_id`)
SELECT
  CONCAT('Message ', FLOOR(RAND() * 100)),
  FLOOR(RAND() * 1640995200000),
  -- случайное время в миллисекундах от 01.01.2022 до текущего момента
  FLOOR(RAND() * 2) + 1,
  -- случайный получатель из пользователей (id 1-2)
  1
FROM
  information_schema.tables
LIMIT
  100;

CREATE TABLE IF NOT EXISTS m2m_users_chats (
  user_id INT NOT NULL,
  chat_id INT NOT NULL,
  PRIMARY KEY (user_id, chat_id),
  CONSTRAINT `Constr_m2m_users_chats_user_fk` FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Constr_m2m_users_chats_chat_fk` FOREIGN KEY (`chat_id`) REFERENCES chats(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO
  `m2m_users_chats` (user_id, chat_id)
VALUES
  (1, 1),
  (2, 1),
  (1, 2),
  (3, 2),
  (1, 3),
  (4, 3),
  (1, 4),
  (5, 4);

-- KANBAN
CREATE TABLE IF NOT EXISTS `kanban_boards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` text,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO
  `kanban_boards` (name, description, created_at, updated_at)
VALUES
  (
    'Frontend',
    'Some description...',
    '2016-01-01 10:40:01',
    '2022-04-04 12:04:01'
  ),
  (
    'Backend',
    'Some description...',
    '2017-03-08 10:40:01',
    '2022-03-03 12:04:01'
  ),
  (
    'DevOps',
    'Some description...',
    '2018-04-11 10:40:01',
    '2021-04-04 12:04:01'
  );

CREATE TABLE IF NOT EXISTS `kanban_columns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `position` int,
  `board_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES kanban_boards(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO
  `kanban_columns` (name, position, board_id)
VALUES
  ('Todo', 0, 1),
  ('Progress', 1, 1),
  ('Done', 2, 1),
  ('Todo', 0, 2),
  ('Progress', 1, 2),
  ('Todo', 0, 3);

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

INSERT INTO
  `kanban_tasks` (
    name,
    description,
    priority,
    due_date,
    created_at,
    updated_at,
    column_id,
    created_by,
    assigned_to
  )
VALUES
  (
    'FE-1',
    'Some description...',
    '1',
    '2016-01-01 10:40:01',
    '2022-04-04 12:04:01',
    '2025-04-04 12:04:01',
    1,
    1,
    2
  ),
  (
    'FE-2',
    'Some description...',
    '2',
    '2017-03-08 10:40:01',
    '2022-03-03 12:04:01',
    '2025-04-04 12:04:01',
    1,
    1,
    2
  ),
  (
    'FE-3',
    'Some description...',
    '3',
    '2018-04-11 10:40:01',
    '2021-04-04 12:04:01',
    '2025-04-04 12:04:01',
    2,
    2,
    3
  );

CREATE TABLE IF NOT EXISTS `kanban_subtasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `is_completed` BOOLEAN,
  `task_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO
  `kanban_subtasks` (name, is_completed, task_id)
VALUES
  ('1.1', FALSE, 1),
  ('1.2', FALSE, 1),
  ('1.3', TRUE, 1),
  ('2.2', TRUE, 2),
  ('2.3', FALSE, 2),
  ('2.3', TRUE, 3);

CREATE TABLE IF NOT EXISTS `kanban_task_attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255),
  `task_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO
  `kanban_task_attachments` (task_id, url)
VALUES
  (1, 'example1.jpg'),
  (1, 'example1.jpg'),
  (2, 'example2.png');

CREATE TABLE IF NOT EXISTS `kanban_task_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `board_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`board_id`) REFERENCES kanban_boards(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO
  `kanban_task_tags` (board_id, name)
VALUES
  (1, 'FE'),
  (1, 'BE'),
  (1, 'DevOps'),
  (2, 'FE'),
  (2, 'DevOps');

CREATE TABLE IF NOT EXISTS m2m_kanban_tasks_tags (
  task_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (task_id, tag_id),
  FOREIGN KEY (`task_id`) REFERENCES kanban_tasks(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES kanban_task_tags(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO
  `m2m_kanban_tasks_tags` (task_id, tag_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3);

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