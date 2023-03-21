import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Popover as MuiPopover } from '@mui/material'

interface Props {
  children: JSX.Element
  activateElement: (open: any, handleOpen: (e: any) => void) => JSX.Element
  selfClosed?: boolean
}

function Popover({ children, activateElement, selfClosed = false }: Props) {
  const [open, setOpen] = useState(null)

  const handleOpen = (e: any) => {
    setOpen(e.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      {activateElement(open, handleOpen)}

      <MuiPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        onClick={() => {
          if (selfClosed) {
            handleClose()
          }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75
          }
        }}
        disableScrollLock
      >
        {children}
      </MuiPopover>
    </>
  )
}

export default observer(Popover)
