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
    <Paper elevation={1} sx={{ minWidth: '330px', height: 'fit-content' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={t('user:basicDetails')}
        sx={{ pb: 0 }}
      />
      <List sx={{ p: 0 }}>
        <ListItem>
          <ListItemText
            primary={t('user:fullName')}
            secondary={getFullName(user.name, user.surname, user.middle_name)}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={t('user:email')} secondary={user.email} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={t('user:telephoneNumber')} secondary={user.tel_number} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={t('user:country')} secondary="USA" />
        </ListItem>
        <Divider />
      </List>
      <CardActions>
        <Button size="small" sx={{ color: ({ palette }) => palette.text.primary }}>
          {t('actions.edit')}
        </Button>
      </CardActions>
    </Paper>
  )
}

export default observer(UserBasicDetails)
