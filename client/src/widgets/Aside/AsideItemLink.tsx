import { IconButton } from '@mui/material'

import { ListItemLink } from 'shared/ui'

interface AsideItemLinkProps {
  icon: JSX.Element
  title: string
  to: string
}

const AsideItemLink = ({ icon, title, to }: AsideItemLinkProps) => (
  <ListItemLink
    icon={
      <IconButton sx={{ color: (theme) => theme.palette.grey[500], fontSize: '20px' }}>
        {icon}
      </IconButton>
    }
    primary={title}
    to={to}
  />
)

export default AsideItemLink
