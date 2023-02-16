import { useModal } from 'react-modal-hook'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material'
import { IoCloseSharp } from 'react-icons/io5'

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
          backgroundColor: 'background.rare',
          position: 'relative',
          p: 1,
          gap: 5,
        }}
      >
        <Typography variant="body2" color="text.primary">
          {t(title)}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={hideModal}
          sx={{
            color: 'text.secondary',
            fontSize: '16px',
            p: 0.25,
          }}
        >
          <IoCloseSharp />
        </IconButton>
      </DialogTitle>
      {body(hideModal)}
    </Dialog>
  ))

  return [showModal]
}
