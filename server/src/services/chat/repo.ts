import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { TABLE } from 'shared/consts'
import { ID } from 'shared/types'

const getUserChats = ({ userId }: { userId: ID }) =>
  sequelize.query(
    `
SELECT
    u.name,
    u.name as user_name,
    u.surname as user_surname,
    u.avatar as user_avatar,
    cm.created_at as updated_at,
    cm.text as last_message,
    c.name,
    c.id
FROM
    ${TABLE.users} as u
    JOIN ${TABLE.chat_messages} as cm on u.id = cm.user_id
    JOIN ${TABLE.chats} as c on c.id = cm.chat_id
    JOIN(
        SELECT
            max(cm.id) as id
        FROM
            ${TABLE.chat_messages} as cm
            join ${TABLE.chat_messages} as cm_inner on cm.chat_id = cm_inner.chat_id
            and cm_inner.user_id = ${userId}
        group by
            cm.chat_id
    ) as lattest_msg_id on cm.id = lattest_msg_id.id
order by
    cm.created_at;
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const repo = { getUserChats }

export default repo
