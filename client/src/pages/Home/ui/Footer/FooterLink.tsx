import { Link } from 'react-router-dom'
import { Link as MuiLink, Box } from '@mui/material'

interface Props {
  title: string
  path: string
}

function FooterLink({ category }: { category: Props }) {
  return (
    <MuiLink
      component={Link}
      underline="hover"
      variant="body2"
      color="text.primary"
      to={category.path}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <Box
        sx={{
          mr: 1,
          width: 12,
          height: 2,
          backgroundColor: 'primary.main'
        }}
      />
      {category.title}
    </MuiLink>
  )
}

export default FooterLink
