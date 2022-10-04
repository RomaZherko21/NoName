export const getPostsQuery = (
  orderBy = { field: 'created_at', type: 'ASC' }
) => `SELECT posts.*, users.avatar  FROM posts JOIN users 
        ON posts.user_id = users.id 
        ORDER BY posts.${orderBy.field} ${orderBy.type} 
        LIMIT :limit OFFSET :offset;`
