import { useModal } from 'react-modal-hook'
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const useDialog = (
  title: string,
  body: (hideModal: () => void) => JSX.Element,
  closable = false
) => {
  const [showModal, hideModal] = useModal(() => (
    <Dialog onClose={() => (closable ? hideModal() : null)} open>
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={hideModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
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

export default useDialog
