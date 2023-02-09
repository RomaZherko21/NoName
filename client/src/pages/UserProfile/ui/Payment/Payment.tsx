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

interface Props {
  user: User
}

function Payment({ user }: Props) {
  const { t } = useTranslation()

  return (
    <Paper elevation={1} sx={{ width: '100%', p: 0 }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h5' }}
        title={t('user:payment')}
        sx={{ pb: 0 }}
      />
      <List>
        <ListItem>
          <ListItemText
            primary={t('user:bankCard.number')}
            secondary="1234 1234 1234 1234 1234"
            primaryTypographyProps={{ width: '180px' }}
            sx={{ display: 'flex', alignItems: 'center' }}
          />
        </ListItem>
        <Divider sx={{ color: (theme) => theme.palette.divider }} />
        <ListItem>
          <ListItemText
            primary={t('user:bankCard.expirationDate')}
            secondary="12/23"
            primaryTypographyProps={{ width: '180px' }}
            sx={{ display: 'flex', alignItems: 'center' }}
          />
        </ListItem>
        <Divider sx={{ color: (theme) => theme.palette.divider }} />
        <ListItem>
          <ListItemText
            primary={t('user:bankCard.cvv')}
            secondary="123"
            primaryTypographyProps={{ width: '180px' }}
            sx={{ display: 'flex', alignItems: 'center' }}
          />
        </ListItem>
        <Divider sx={{ color: (theme) => theme.palette.divider }} />
        <ListItem>
          <ListItemText
            primary={t('user:bankCard.holderName')}
            secondary="Vasya Petrov"
            primaryTypographyProps={{ width: '180px' }}
            sx={{ display: 'flex', alignItems: 'center' }}
          />
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

export default observer(Payment)
