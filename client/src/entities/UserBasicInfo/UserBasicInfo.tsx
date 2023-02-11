import { useMemo } from 'react'
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

import { getListConfig } from './getListConfig'

interface Props {
  user: User
}

function UserBasicDetails({ user }: Props) {
  const { t } = useTranslation()

  const listConfig = useMemo(() => getListConfig(user), [user])

  return (
    <Paper elevation={1} sx={{ height: 'fit-content' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={t('user:basicDetails')}
        sx={{ pb: 0 }}
      />
      <List sx={{ p: 0 }}>
        {listConfig.map(({ title, text }) => (
          <>
            <ListItem>
              <ListItemText primary={t(title)} secondary={text} />
            </ListItem>
            <Divider />
          </>
        ))}
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
