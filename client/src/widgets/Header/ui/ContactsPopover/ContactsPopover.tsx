import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, List, Divider, Typography, Tooltip, IconButton } from '@mui/material'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { InformativeImage, Popover } from 'shared/ui'
import { HiOutlineUsers } from 'react-icons/hi'

const CONTACTS = [
  {
    id: 1,
    avatar: '1663318230996.png',
    name: 'Marcus Finn',
    online: true,
    last_login: '',
  },
  {
    id: 2,
    avatar: '1663318230996.png',
    name: 'Carson Darrin',
    online: false,
    last_login: '3 hours ago',
  },
]

function ContactsPopover() {
  const [contacts] = useState(CONTACTS)

  return (
    <Popover
      activateElement={(_, handleOpen) => (
        <Tooltip title="Contacts">
          <IconButton onClick={handleOpen} sx={{ fontSize: '20px' }}>
            <HiOutlineUsers />
          </IconButton>
        </Tooltip>
      )}
    >
      <>
        <Box sx={{ py: 2, px: 2.5 }}>
          <Typography variant="subtitle1">Contacts</Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <List sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 2, gap: 2 }}>
          {contacts.map((item: any) => (
            <InformativeImage
              imgUrl={`${NODE_API_USER_AVATAR_URL}/${item.avatar}`}
              PrimaryText={
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  {' '}
                  {item.name}{' '}
                  <Box
                    sx={{
                      backgroundColor: item.online ? 'secondary.main' : 'grey.400',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              }
              SecondaryText={item.last_login ? item.last_login : ''}
            />
          ))}
        </List>
      </>
    </Popover>
  )
}

export default observer(ContactsPopover)
