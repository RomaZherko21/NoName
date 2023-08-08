import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { Button, Stack } from '@mui/material'
import { FilesModel } from "../../model"


import { Input, Modal } from 'shared/ui'
import { HiPlus } from "react-icons/hi"

interface Props {
    open: boolean
    handleClose: () => void
}

function AddTag({ open, handleClose }: Props) {
    const { t } = useTranslation()

    const [tagName, setTagName] = useState('')
    const [isButtonDisable, setIsButtonDisable] = useState(true)

    const createTag = () => {
        FilesModel.addFolderTag(tagName)
        setTagName('')
        handleClose()
    }

    return (
        <Modal
            open={open}
            handleClose={() => { handleClose(); setTagName(''); setIsButtonDisable(true) }}
        >
            <Stack direction="row" spacing={3} sx={{ py: 2, px: 2 }} >
                <Input
                    placeholder={t('fields.tagName')}
                    value={tagName}
                    fullWidth
                    onFocus={() => tagName ? setIsButtonDisable(false) : null}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        {
                            setTagName(e.target.value); setIsButtonDisable(e.target.value === '')
                        }
                    }} />
            </Stack>
            <Button disabled={isButtonDisable} size="small" onClick={() => {
                if (tagName) {
                    createTag();
                } else {
                    setIsButtonDisable(true);
                }
            }} startIcon={<HiPlus />} variant="contained" color="primary" sx={{ padding: 0.5, px: 3, ml: 13, mb: 2, mt: 0 }} >{t('actions.add')}</Button>
        </Modal>
    )

}


export default observer(AddTag)