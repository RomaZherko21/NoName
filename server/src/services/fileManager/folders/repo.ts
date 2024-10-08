import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { TABLE } from 'shared/consts'
import { ID } from 'shared/types'

console.log()

const getFolderById = ({ folderId }: { folderId: ID }) =>
  sequelize.query(
    `
SELECT
    fo.id,
    fo.name,
    fo.created_at,
    fo.updated_at,
    COUNT(fi.id) as files_count,
    SUM(fi.size) as memory_used,
    u.assignee_to,
    users.avatar as created_by
FROM
    ${TABLE.folders} as fo
    LEFT JOIN ${TABLE.files} as fi on fi.folder_id = fo.id
    JOIN ${TABLE.users} as users on fo.created_by = users.id
    LEFT JOIN (
        SELECT
            JSON_ARRAYAGG(users.avatar) as assignee_to,
            m2m_u_fo.folder_id
        from
            ${TABLE.users}
            JOIN ${TABLE.m2m_users_folders} as m2m_u_fo on m2m_u_fo.user_id = users.id
        GROUP BY
            m2m_u_fo.folder_id
    ) as u on u.folder_id = fo.id
WHERE
    fo.id = ${folderId}
GROUP BY
    fo.id;
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const getFolders = () =>
  sequelize.query(
    `
SELECT
    fo.id,
    fo.name,
    fo.created_at,
    COUNT(fi.id) as files_count,
    SUM(fi.size) as memory_used,
    u.assignee_to
FROM
    ${TABLE.folders} as fo
    LEFT JOIN ${TABLE.files} as fi on fi.folder_id = fo.id
    LEFT JOIN (
        SELECT
            JSON_ARRAYAGG(users.avatar) as assignee_to,
            m2m_u_fo.folder_id
        from
            users
            JOIN ${TABLE.m2m_users_folders} as m2m_u_fo on m2m_u_fo.user_id = users.id
        GROUP BY
            m2m_u_fo.folder_id
    ) as u on u.folder_id = fo.id
GROUP BY
    fo.id;
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const repo = { getFolderById, getFolders }

export default repo
