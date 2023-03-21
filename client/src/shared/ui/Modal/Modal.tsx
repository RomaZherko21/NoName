import { ReactNode } from 'react'
import { Box, IconButton, Modal as MUiModal, Paper, Typography } from '@mui/material'
import { IoCloseSharp } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  handleClose: () => void
  children: ReactNode
  closable?: boolean
  title?: string
  footer?: ReactNode
}

const Modal = ({ open, handleClose, children, closable = true, title = '', footer }: Props) => {
  const { t } = useTranslation()

  return (
    <MUiModal
      open={open}
      onClose={() => {
        if (closable) {
          handleClose()
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          minWidth: 300,
          borderRadius: 2
        }}
      >
        {title && (
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'background.default',
              position: 'relative',
              p: 2,
              borderRadius: 2,
              borderEndEndRadius: 0,
              borderEndStartRadius: 0
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {t(title)}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: 'text.secondary',
                fontSize: '16px',
                p: 0.25
              }}
            >
              <IoCloseSharp />
            </IconButton>
          </Paper>
        )}

        {children}

        {footer && (
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 2,
              borderRadius: 2,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: 'background.default'
            }}
          >
            {footer}
          </Paper>
        )}
      </Box>
    </MUiModal>
  )
}

export default Modal
