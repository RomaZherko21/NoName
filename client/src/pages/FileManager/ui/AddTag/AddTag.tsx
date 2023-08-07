import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { Button, Stack, TextField } from '@mui/material'
import { FilesModel } from "../../model"


import { Modal } from 'shared/ui'

interface Props {
    open: boolean
    handleClose: () => void
}

function AddTag({ open, handleClose }: Props) {
    const { t } = useTranslation()

    const [tagName, setTagName] = useState('')
    const [error, setError] = useState(false)

    const createTag = () => {
        FilesModel.addFolderTag(tagName)
        setTagName('')
        handleClose()
    }

    return (
        <Modal
            open={open}
            handleClose={() => { handleClose(); setError(false) }}
        >
            <Stack direction="row" spacing={3} sx={{ py: 3, px: 3 }} >
                <TextField
                    value={error ? 'Field is required' : tagName}
                    label='Tag name'
                    fullWidth
                    error={error}
                    onFocus={() => setError(false)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTagName(e.target.value)
                    }} />
                <Button size="small" onClick={() => tagName ? createTag() : setError(true)} variant="contained" color="primary">{t('actions.add')}</Button>
            </Stack>
        </Modal>
    )

}


export default observer(AddTag)