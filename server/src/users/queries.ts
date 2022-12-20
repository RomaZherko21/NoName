export const getUserListQuery = ({
  limit,
  offset,
  filters = {},
}: {
  limit: number
  offset: number
  filters: { name?: string; surname?: string; email?: string; role?: string; id?: string }
}) => `SELECT *  FROM users
        WHERE name LIKE '%${filters.name || ''}%'
        AND surname LIKE '%${filters.surname || ''}%'
        AND email LIKE '%${filters.email || ''}%'
        AND role LIKE '%${filters.role || ''}%'
        AND id LIKE '%${filters.id || ''}%'
        LIMIT ${limit} OFFSET ${offset};`
