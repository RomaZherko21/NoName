import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Paper,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
  Divider,
} from '@mui/material'

import { User } from 'shared/types'
import { getFullName } from 'shared/helpers'

interface Props {
  user: User
}

function UserBasicDetails({ user }: Props) {
  const { t } = useTranslation()

  return (
    <Paper elevation={1} sx={{ minWidth: '330px', maxHeight: '410px' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={t('user:basicDetails')}
        sx={{ pb: 0 }}
      />
      <List>
        <ListItem>
          <ListItemText
            primary={t('user:fullName')}
            secondary={getFullName(user.name, user.surname, user.middle_name)}
          />
        </ListItem>
        <Divider sx={{ color: (theme) => theme.palette.divider }} />
        <ListItem>
          <ListItemText primary={t('user:email')} secondary={user.email} />
        </ListItem>
        <Divider sx={{ color: (theme) => theme.palette.divider }} />
        <ListItem>
          <ListItemText primary={t('user:telephoneNumber')} secondary={user.tel_number} />
        </ListItem>
        <Divider sx={{ color: (theme) => theme.palette.divider }} />
        <ListItem>
          <ListItemText primary={t('user:country')} secondary="USA" />
        </ListItem>
        <Divider sx={{ color: (theme) => theme.palette.divider }} />
      </List>
      <CardActions sx={{ p: 1 }}>
        <Button variant="outlined" size="large">
          {t('actions.edit')}
        </Button>
      </CardActions>
    </Paper>
  )
}

export default observer(UserBasicDetails)
