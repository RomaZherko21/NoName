import { Checklists, Overview, Comments } from '../../ui'

export const getTabsConfig = () => [
  {
    label: 'kanban:overview',
    Component: Overview
  },
  {
    label: 'kanban:checklists',
    Component: Checklists
  },
  {
    label: 'kanban:comments',
    Component: Comments
  }
]
