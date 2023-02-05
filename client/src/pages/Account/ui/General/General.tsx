import { Grid, Paper, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { DeleteAccount } from './DeleteAccount'
import { ProfileForm } from './ProfileForm'

const General = () => {
  const { t } = useTranslation()

  return (
    <>
      <ProfileForm />
      <Grid xs={12} sx={{ pt:1 }}>
        <DeleteAccount />
      </Grid>
    </>
  )
}

export default observer(General)
