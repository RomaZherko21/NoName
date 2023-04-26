import { ConnectionStatus, sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { TABLE } from 'shared/consts'
import { ID } from 'shared/types'

const getUserConnections = ({
  userId,
  status,
  name = '',
  surname = '',
  isReceivedStatus,
}: {
  userId: string
  name?: string
  surname?: string
  status: string
  isReceivedStatus: boolean
}) =>
  sequelize.query(
    `
SELECT
    uc.status,
    u.id as user_id,
    u.name,
    u.surname,
    u.middle_name,
    u.avatar,
    u.email,
    u.tel_number
FROM
    ${TABLE.user_connections} as uc
    JOIN ${TABLE.users} as u ON (uc.${isReceivedStatus ? 'sender_id' : 'recipient_id'} = u.id)
WHERE
    uc.${isReceivedStatus ? 'recipient_id' : 'sender_id'} = ${userId || 0}
    AND uc.status = '${status}'
    AND u.name LIKE '%${name}%'
    AND u.surname LIKE '%${surname}%';
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const deleteUserConnection = ({ userId, id }: { userId: ID; id: ID }) =>
  sequelize.query(
    `
DELETE FROM
    ${TABLE.user_connections} as uc
WHERE
uc.sender_id = ${userId}
    AND uc.recipient_id = ${id}
    OR uc.sender_id = ${id}
    AND uc.recipient_id = ${userId}
`,
    {
      type: QueryTypes.DELETE,
    }
  )

const updateConnectionStatus = ({
  status,
  userId,
  id,
}: {
  status: ConnectionStatus
  userId: ID
  id: ID
}) =>
  sequelize.query(
    `
UPDATE
    ${TABLE.user_connections} as uc
SET
    uc.status = '${status}'
WHERE
    uc.sender_id = ${userId}
    AND uc.recipient_id = ${id}
    OR uc.sender_id = ${id}
    AND uc.recipient_id = ${userId}
`,
    {
      type: QueryTypes.UPDATE,
    }
  )

const repo = { getUserConnections, deleteUserConnection, updateConnectionStatus }

export default repo
