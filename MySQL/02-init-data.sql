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
        '1.png'
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
        '2.png'
    );

INSERT INTO
    users (
        name,
        surname,
        middle_name,
        email,
        tel_number,
        job_title,
        gender,
        date_of_birth,
        role,
        avatar,
        profile_background,
        native_country,
        native_city,
        residence_country,
        residence_city,
        card_number,
        name_on_card,
        valid_thru,
        cvv,
        is_email_verified,
        is_phone_verified,
        is_two_factor_auth_active,
        is_sms_alerts_active,
        is_email_alerts_active,
        password
    )
SELECT
    CONCAT('Name', i) AS name,
    CONCAT('Surname', i) AS surname,
    CONCAT('MiddleName', i) AS middle_name,
    CONCAT('email', i + 10000, '@example.com') AS email,
    CONCAT('+37525', i + 1000000) AS tel_number,
    CONCAT('Job Title', i) AS job_title,
    IF(i % 2 = 0, 'woman', 'man') AS gender,
    DATE_ADD(
        '1970-01-01',
        INTERVAL FLOOR(RAND() * 365 * 50) DAY
    ) AS date_of_birth,
    IF(RAND() < 0.5, 'admin', 'user') AS role,
    '3.png' AS avatar,
    '3.png' AS profile_background,
    CONCAT('NativeCountry', i) AS native_country,
    CONCAT('NativeCity', i) AS native_city,
    CONCAT('ResidenceCountry', i) AS residence_country,
    CONCAT('ResidenceCity', i) AS residence_city,
    10 AS card_number,
    CONCAT('Name on Card', i) AS name_on_card,
    CONCAT('12/2', i % 10, '/2025') AS valid_thru,
    CONCAT(FLOOR(RAND() * 100)) AS cvv,
    IF(RAND() < 0.5, 1, 0) AS is_email_verified,
    IF(RAND() < 0.5, 1, 0) AS is_phone_verified,
    IF(RAND() < 0.5, 1, 0) AS is_two_factor_auth_active,
    IF(RAND() < 0.5, 1, 0) AS is_sms_alerts_active,
    IF(RAND() < 0.5, 1, 0) AS is_email_alerts_active,
    '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS' AS password
FROM
    (
        SELECT
            n + m * 10 + o * 100 + p * 1000 + 1 AS i
        FROM
            (
                SELECT
                    0 AS n
                UNION
                SELECT
                    1
                UNION
                SELECT
                    2
                UNION
                SELECT
                    3
                UNION
                SELECT
                    4
                UNION
                SELECT
                    5
                UNION
                SELECT
                    6
                UNION
                SELECT
                    7
                UNION
                SELECT
                    8
                UNION
                SELECT
                    9
            ) a,
            (
                SELECT
                    0 AS m
                UNION
                SELECT
                    1
                UNION
                SELECT
                    2
                UNION
                SELECT
                    3
                UNION
                SELECT
                    4
                UNION
                SELECT
                    5
                UNION
                SELECT
                    6
                UNION
                SELECT
                    7
                UNION
                SELECT
                    8
                UNION
                SELECT
                    9
            ) b,
            (
                SELECT
                    0 AS o
                UNION
                SELECT
                    1
                UNION
                SELECT
                    2
                UNION
                SELECT
                    3
                UNION
                SELECT
                    4
                UNION
                SELECT
                    5
                UNION
                SELECT
                    6
                UNION
                SELECT
                    7
                UNION
                SELECT
                    8
                UNION
                SELECT
                    9
            ) c,
            (
                SELECT
                    0 AS p
                UNION
                SELECT
                    1
                UNION
                SELECT
                    2
                UNION
                SELECT
                    3
                UNION
                SELECT
                    4
                UNION
                SELECT
                    5
                UNION
                SELECT
                    6
                UNION
                SELECT
                    7
                UNION
                SELECT
                    8
                UNION
                SELECT
                    9
            ) d
    ) numbers
WHERE
    i <= 1000;

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

INSERT INTO
    posts (
        name,
        short_description,
        description,
        reading_time,
        created_at,
        image,
        user_id,
        genre_id
    )
SELECT
    CONCAT('Name', i) AS name,
    CONCAT('ShortDescription', i) AS short_description,
    '<head> <title>Div Align Attribbute</title> </head> <body> <div align="left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="right"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> <div align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div> </body>' AS description,
    FLOOR(RAND() * 100) AS reading_time,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at,
    '1663318230996.jpg' AS image,
    FLOOR((RAND() * 10) + 1) AS user_id,
    FLOOR((RAND() * 10) + 1) AS genre_id
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            200
    ) AS t;

INSERT INTO
    m2m_users_posts_likes (user_id, post_id)
SELECT
    i AS user_id,
    FLOOR((RAND() * 200) + 1) AS post_id
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            1000
    ) AS t;

INSERT INTO
    post_comments (user_id, post_id, message, created_at)
SELECT
    FLOOR((RAND() * 10) + 1) AS user_id,
    FLOOR((RAND() * 200) + 1) AS post_id,
    CONCAT('Message...', i) AS message,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            1000
    ) AS t;

INSERT INTO
    user_connections (sender_id, recipient_id, status)
SELECT
    FLOOR((RAND() * 5) + 1) AS sender_id,
    i + 1 + 10 AS recipient_id,
    IF(RAND() < 0.5, 'pending', 'accept') AS status
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            500
    ) AS t;

INSERT INTO
    chats (name, created_at, updated_at)
SELECT
    CONCAT('Chat...', i) AS name,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS updated_at
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            20
    ) AS t;

INSERT INTO
    chat_messages (text, created_at, user_id, chat_id)
SELECT
    CONCAT('Message ', FLOOR(RAND() * 1000)) as text,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at,
    FLOOR(RAND() * 5) + 1 as user_id,
    FLOOR(RAND() * 10) + 1 as chat_id
FROM
    information_schema.tables
LIMIT
    3000;

INSERT INTO
    m2m_users_chats (user_id, chat_id)
SELECT
    1 as user_id,
    i as chat_id
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            10
    ) AS t;

-- KANBAN
INSERT INTO
    kanban_boards (name, description, created_at, updated_at)
SELECT
    CONCAT('Name ', i) as name,
    CONCAT('Description ', i) as description,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS updated_at
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            10
    ) AS t;

INSERT INTO
    `kanban_columns` (name, position, board_id)
VALUES
    ('Todo', 0, 1),
    ('Progress', 1, 1),
    ('Done', 2, 1),
    ('Todo', 0, 2),
    ('Progress', 1, 2),
    ('Todo', 0, 3);

INSERT INTO
    kanban_tasks (
        name,
        description,
        priority,
        due_date,
        created_at,
        updated_at,
        column_id,
        created_by
    )
SELECT
    CONCAT('FE-', i) as name,
    CONCAT('Some description... ', i) as description,
    FLOOR(RAND() * 4 + 1) as priority,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS due_date,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS updated_at,
    FLOOR(RAND() * 3 + 1) as column_id,
    FLOOR(RAND() * 3 + 1) as created_by
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            100
    ) AS t;

INSERT INTO
    kanban_subtasks (name, is_completed, task_id)
SELECT
    CONCAT('Name ', FLOOR(RAND() * 1000)) as name,
    IF(RAND() < 0.5, 1, 0) AS is_completed,
    FLOOR(RAND() * 10 + 1) as task_id
FROM
    information_schema.tables
LIMIT
    500;

INSERT INTO
    kanban_task_attachments (url, task_id)
SELECT
    CONCAT('example', FLOOR(RAND() * 2 + 1), '.jpg') as url,
    FLOOR(RAND() * 10 + 1) as task_id
FROM
    information_schema.tables
LIMIT
    500;

INSERT INTO
    kanban_task_tags (name, board_id)
SELECT
    CONCAT('FE-', FLOOR(RAND() * 1000)) as name,
    FLOOR(RAND() * 5 + 1) as board_id
FROM
    information_schema.tables
LIMIT
    50;

INSERT INTO
    m2m_kanban_tasks_tags (task_id, tag_id)
SELECT
    i as task_id,
    FLOOR(RAND() * 50 + 1) as created_by
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            50
    ) AS t;

INSERT INTO
    m2m_kanban_users_tasks (user_id, task_id)
SELECT
    i as user_id,
    FLOOR(RAND() * 10 + 1) as task_id
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            500
    ) AS t;

INSERT INTO
    folders (name, created_at, updated_at)
SELECT
    CONCAT('FE-', FLOOR(RAND() * 100)) as name,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS updated_at
FROM
    information_schema.tables
LIMIT
    20;

INSERT INTO
    files (
        name,
        url,
        format,
        size,
        folder_id,
        user_id,
        created_at,
        updated_at
    )
SELECT
    CONCAT('File', FLOOR(RAND() * 100)) as name,
    'example1.jpg' AS url,
    'jpg' AS format,
    FLOOR(RAND() * 100000) AS size,
    FLOOR(RAND() * 10 + 1) AS folder_id,
    FLOOR(RAND() * 10 + 1) AS user_id,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS created_at,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY) AS updated_at
FROM
    information_schema.tables
LIMIT
    20;

INSERT INTO
    folder_tags (name)
SELECT
    CONCAT('Tag', FLOOR(RAND() * 1000)) as name
FROM
    information_schema.tables
LIMIT
    50;

INSERT INTO
    m2m_folders_tags (folder_id, tag_id)
SELECT
    FLOOR(RAND() * 10 + 1) as folder_id,
    i as tag_id
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            40
    ) AS t;

INSERT INTO
    m2m_users_folders (folder_id, user_id)
SELECT
    FLOOR(RAND() * 10 + 1) as folder_id,
    i as user_id
FROM
    (
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY
                    RAND()
            ) AS i
        FROM
            information_schema.columns
        LIMIT
            500
    ) AS t;