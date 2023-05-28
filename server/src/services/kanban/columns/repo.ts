import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { TABLE } from 'shared/consts'

const getKanbanColumns = ({ board_id }: any) =>
  sequelize.query(
    `
SELECT
    kc.id,
    kc.name,
    kc.position
FROM
    ${TABLE.kanban_columns} as kc
    LEFT JOIN ${TABLE.kanban_tasks} as kt on kc.id = kt.column_id
WHERE
    kc.board_id = ${board_id}
GROUP BY
    kc.id;
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const getKanbanTasksByColumnId = ({ column_id }: any) =>
  sequelize.query(
    `
SELECT
    kt.id,
    kt.name,
    kta.attachments,
    JSON_ARRAYAGG(ktt.tag_name) as tags,
    users.name as created_by,
    JSON_ARRAYAGG(u.assigne_to) as assigne_to
from
    ${TABLE.kanban_tasks} as kt
    LEFT JOIN (
        SELECT
            kta_inner.task_id as task_id,
            JSON_ARRAYAGG(kta_inner.url) as attachments
        from
            ${TABLE.kanban_task_attachments} as kta_inner
        GROUP BY
            task_id
    ) as kta on kt.id = kta.task_id
    LEFT JOIN (
        SELECT
        ktt_inner.name as tag_name,
            m2m_ktt_inner.task_id as task_id
        from
            ${TABLE.kanban_task_tags} as ktt_inner
            JOIN ${TABLE.m2m_kanban_tasks_tags} as m2m_ktt_inner on m2m_ktt_inner.tag_id = ktt_inner.id
        GROUP BY
            tag_name,
            task_id
    ) as ktt on kt.id = ktt.task_id
    LEFT JOIN (
        SELECT
            u_inner.avatar as assigne_to,
            m2m_kut_inner.task_id as task_id
        from
            ${TABLE.users} as u_inner
            JOIN ${TABLE.m2m_kanban_users_tasks} as m2m_kut_inner on m2m_kut_inner.user_id = u_inner.id
    ) as u on kt.id = u.task_id
    JOIN ${TABLE.users} as users on users.id = kt.created_by
WHERE
    kt.column_id = ${column_id}
GROUP BY
    kt.name,
    kt.id;
`,
    {
      type: QueryTypes.SELECT,
    }
  )

const repo = { getKanbanColumns, getKanbanTasksByColumnId }

export default repo
