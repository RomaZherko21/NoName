import { observer } from "mobx-react-lite"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { Button, Stack, TextField  } from '@mui/material'

import { Modal } from 'shared/ui'

interface Props {
    open: boolean
    handleClose: ()=> void
  }

function AddTag({ open, handleClose }: Props){
    const { t } = useTranslation()

    const [tagName, setTagName] = useState('')

    const logger = ()=>{
        console.log(tagName)
        setTagName('')
    }

    return (
        <Modal
        open={open}
        handleClose={handleClose}
        >
            <Stack direction="row" spacing={3} sx={{ py: 3, px:3 }} >
                <TextField value={tagName} label='Tag name' fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTagName(e.target.value); console.log('set');
  }}/>
                    <Button size="small" onClick={()=>tagName? logger() : null} variant="contained" color="primary">{t('actions.add')}</Button>
            </Stack>
        </Modal>
      )

}


export default observer(AddTag)