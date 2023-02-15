import { Link } from 'react-router-dom'
import { Paper, Stack, Avatar, Typography, Box, IconButton } from '@mui/material'
import { BsTelephone } from 'react-icons/bs'
import { FiMoreVertical, FiSearch } from 'react-icons/fi'

import { ROUTES } from 'shared/consts'

function Header() {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRight: 'none',
        borderLeft: 'none',
        borderRadius: 0,
        height: '66px',
        width: `100%`,
      }}
    >
      <Box
        component={Link}
        to={ROUTES.USERS}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
      >
        <Avatar sx={{ height: '32px', width: '32px' }} />
        <Stack>
          <Typography variant="subtitle2" color="text.primary">
            Miron Vitold
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last active 4 hours ago
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <IconButton>
          <BsTelephone size="18px" />
        </IconButton>
        <IconButton>
          <FiSearch size="18px" />
        </IconButton>
        <IconButton>
          <FiMoreVertical size="18px" />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default Header
