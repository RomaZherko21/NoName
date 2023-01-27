import { Tooltip } from '@mui/material'

import { ListItemLink } from 'shared/ui'

interface AsideItemLinkProps {
  icon: JSX.Element
  title: string
  to: string
}

const AsideItemLink = ({ icon, title, to }: AsideItemLinkProps) => (
  <ListItemLink
    icon={
      <Tooltip title={title} placement="right">
        {icon}
      </Tooltip>
    }
    primary={title}
    to={to}
  />
)

export default AsideItemLink
