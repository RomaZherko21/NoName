import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { ID, LIMIT, OFFSET, ORDER_TYPE, TABLE } from 'shared/consts'

const getUsers = ({
  id = ID,
  name = '',
  surname = '',
  middle_name = '',
  email = '',
  role = '',
  gender = '',
  connection_status = '',
  limit = LIMIT,
  offset = OFFSET,
  order_by = 'email',
  order_type = ORDER_TYPE,
  authorization_id,
}: any) =>
  sequelize.query(
    `
SELECT
    u.*,
    uc.status as connection_status
FROM
    ${TABLE.users} as u
    LEFT JOIN ${TABLE.user_connections} as uc ON (
        ${authorization_id} = uc.sender_id
        AND u.id = uc.recipient_id
        OR ${authorization_id} = uc.recipient_id
        AND u.id = uc.sender_id
    )
WHERE
    u.id LIKE '%${id}%'
    AND u.name LIKE '%${name}%'
    AND u.surname LIKE '%${surname}%'
    AND u.middle_name LIKE '%${middle_name}%'
    AND u.email LIKE '%${email}%'
    AND u.role LIKE '%${role}%'
    AND u.gender LIKE '%${gender}%'
    AND (
        uc.status LIKE '%${connection_status}%'
        OR uc.status IS NULL
    )
ORDER BY
    ${order_by} ${order_type}
LIMIT 
    ${limit} OFFSET ${offset};
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const repo = { getUsers }

export default repo
