import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { ID, LIMIT, OFFSET, ORDER_TYPE, TABLE } from 'shared/consts'

const getPosts = ({
  id = ID,
  user_id = ID,
  name = '',
  description = '',
  limit = LIMIT,
  offset = OFFSET,
  order_by = 'name',
  order_type = ORDER_TYPE,
}: any) =>
  sequelize.query(
    `
SELECT
    p.*,
    g.name as genre,
    u.name as user_name,
    u.surname as user_surname,
    u.middle_name as user_middle_name,
    u.email as user_email,
    u.avatar,
    COUNT(upl.post_id) as likes_count,
    JSON_ARRAYAGG(upl.user_id) as liked_users
FROM
    ${TABLE.posts} as p
    JOIN ${TABLE.users} as u ON p.user_id = u.id
    LEFT JOIN ${TABLE.m2m_users_posts_likes} as upl ON p.id = upl.post_id
    JOIN ${TABLE.genres} as g ON p.genre_id = g.id
WHERE
    p.id LIKE '%${id}%'
    AND p.user_id LIKE '%${user_id}%'
    AND p.name LIKE '%${name}%'
    AND p.description LIKE '%${description}%'
GROUP BY
    p.id
ORDER BY ${order_by} ${order_type}
LIMIT ${limit} OFFSET ${offset};
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const repo = { getPosts }

export default repo
