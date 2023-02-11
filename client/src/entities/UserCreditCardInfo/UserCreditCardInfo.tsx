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
  ListItemIcon,
  Typography,
} from '@mui/material'

import { getListConfig } from './getListConfig'

interface Props {}

function UserCreditCardInfo(props: any) {
  const { t } = useTranslation()

  const listConfig = useMemo(() => getListConfig(props), [props])

  return (
    <Paper elevation={1} sx={{ width: '100%', p: 0 }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={t('user:payment')}
        sx={{ pb: 0 }}
      />
      <List>
        {listConfig.map(({ Icon, text, title }) => (
          <>
            <ListItem key={text}>
              <ListItemIcon sx={{ p: 0, m: 0, fontSize: 16 }}>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ width: 180 }}>
                    {t(title)}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                }
                sx={{ display: 'flex', alignItems: 'center' }}
              />
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

export default observer(UserCreditCardInfo)
