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
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          position: 'relative',
          p: 2,
        }}
      >
        <Typography variant="h6" color="primary.contrastText">
          {t(title)}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={hideModal}
          sx={{
            color: 'primary.contrastText',
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
