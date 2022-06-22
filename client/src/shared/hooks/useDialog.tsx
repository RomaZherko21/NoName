import { useModal } from 'react-modal-hook'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const useDialog = (
  title: string,
  body: (hideModal: () => void) => JSX.Element,
  closable = false
) => {
  const { t } = useTranslation()

  const [showModal, hideModal] = useModal(() => (
    <Dialog onClose={() => (closable ? hideModal() : null)} open>
      <DialogTitle>
        <Typography variant="h6" component="div">
          {t(title)}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={hideModal}
          sx={{
            position: 'absolute',
            padding: 0,
            right: 4,
            top: 4,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {body(hideModal)}
    </Dialog>
  ))

  return [showModal]
}
