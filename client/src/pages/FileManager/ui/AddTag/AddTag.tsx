import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { Button, Stack, Grid, TextField  } from '@mui/material'

import { Modal } from 'shared/ui'

interface Props {
    open: boolean
    handleClose: ()=> void
  }

function AddTag({ open, handleClose }: Props){

    const { t } = useTranslation()

    return (

    <Modal
      open={open}
      handleClose={handleClose}
    >
      <Stack direction="row" spacing={3} sx={{ py: 3, px:3 }} >
      <TextField label='Tag name' fullWidth id="fullWidth"/>
        <Button size="small" onClick={()=>console.log()} variant="contained" color="primary">{t('actions.add')}</Button>
      </Stack>
    </Modal>
      )

}


export default observer(AddTag)