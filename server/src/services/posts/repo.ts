import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { TABLE } from 'shared/consts'
import { ID, Pagination, Sorting } from 'shared/types'

const getPosts = ({
  postId,
  userId,
  name,
  description,
  orderBy,
  orderType,
  limit,
  offset,
}: { postId: ID; userId: ID; name: string; description: string } & Pagination & Sorting) =>
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
    JOIN ${TABLE.users} ON p.user_id = u.id
    LEFT JOIN ${TABLE.m2m_users_posts_likes} as upl ON p.id = upl.post_id
    JOIN ${TABLE.genres} as g ON p.genre_id = g.id
WHERE
    p.id LIKE '%${postId}%'
    AND p.user_id LIKE '%${userId}%'
    AND p.name LIKE '%${name}%'
    AND p.description LIKE '%${description}%'
GROUP BY
    p.id
ORDER BY
    ${orderBy} ${orderType}
LIMIT
    ${limit} OFFSET ${offset};
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const repo = { getPosts }

export default repo
