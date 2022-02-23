import { useModal } from 'react-modal-hook'
import { Dialog, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const useDialog = (title: string, body: JSX.Element) => {
  const [showModal, hideModal] = useModal(() => (
    <Dialog open>
      <DialogTitle>
        {title}
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
      {body}
    </Dialog>
  ))

  return [showModal]
}

export default useDialog
