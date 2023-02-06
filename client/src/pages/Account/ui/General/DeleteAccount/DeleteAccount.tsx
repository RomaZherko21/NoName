import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

import { useDialog } from 'shared/hooks'

import ConfirmDialog from './ConfirmDialog'

const DeleteAccount = () => {
  const { t } = useTranslation()

  const [showConfirmationModal] = useDialog(
    'notification:sure',
    (onClose) => <ConfirmDialog onClose={onClose} />,
    true
  )

  return (
    <Grid component={Paper} sx={{ p: 4, width: '100%', mt: 2 }} container>
      <Grid item lg={4} md={6} xs={12}>
        <Typography color="textPrimary" variant="h6">
          {t('user:actions.deleteAccount')}
        </Typography>
      </Grid>
      <Grid item lg={8} md={6} xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography color="textPrimary" variant="body1">
            {t('sentences:deleteAccount')}
          </Typography>
          <Button
            onClick={showConfirmationModal}
            sx={{ mt: 3, width: 'fit-content' }}
            color="error"
            variant="outlined"
          >
            {t('user:actions.deleteAccount')}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default observer(DeleteAccount)
