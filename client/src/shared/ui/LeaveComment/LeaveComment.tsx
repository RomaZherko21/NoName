import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Button, IconButton, Paper, Stack, TextField } from '@mui/material'

import { BsLink, BsEmojiSmile } from 'react-icons/bs'
import { MdOutlinePhotoCameraBack } from 'react-icons/md'

interface Props {
  avatarUrl: string
  label: string
  filledBackground?: boolean
}

const LeaveComment = ({ avatarUrl, label, filledBackground = false }: Props) => {
  const { t } = useTranslation()

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'start',
        backgroundColor: filledBackground ? 'background.secondary' : 'transparent',
        p: 2,
        gap: 2,
        mb: 4,
      }}
      elevation={filledBackground ? 1 : 0}
    >
      <Avatar alt="Avatar" sx={{ cursor: 'pointer', width: 40, height: 40 }} src={avatarUrl} />

      <Stack sx={{ width: '100%', gap: 2 }}>
        <TextField placeholder={t(label)} fullWidth multiline rows={3} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row">
            <IconButton sx={{ fontSize: '20px' }} aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <MdOutlinePhotoCameraBack />
            </IconButton>

            <IconButton sx={{ fontSize: '20px' }} aria-label="link" component="label">
              <BsLink />
            </IconButton>

            <IconButton sx={{ fontSize: '20px' }} aria-label="choose emoji" component="label">
              <BsEmojiSmile />
            </IconButton>
          </Stack>

          <Button size="small" variant="contained">
            {t('actions.post')}
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}

export default observer(LeaveComment)
