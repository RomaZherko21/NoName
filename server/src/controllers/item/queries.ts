export const getItemListQuery = (
  orderBy = { field: 'createdAt', type: 'ASC' }
) => `SELECT items.*, users.avatar  FROM items JOIN users 
        ON items.userId = users.id 
        ORDER BY items.${orderBy.field} ${orderBy.type} 
        LIMIT :limit OFFSET :offset;`
