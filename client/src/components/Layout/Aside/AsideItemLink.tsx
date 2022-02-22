import { Tooltip } from '@mui/material'

import ListItemLink from 'components/ListItemLink'

interface AsideItemLinkProps {
  icon: JSX.Element
  isOpen: boolean
  title: string
  to: string
}

const AsideItemLink = ({ icon, title, to, isOpen }: AsideItemLinkProps) => (
  <ListItemLink
    icon={
      isOpen ? (
        icon
      ) : (
        <Tooltip title={title} placement="right">
          {icon}
        </Tooltip>
      )
    }
    primary={title}
    to={to}
  />
)

export default AsideItemLink
