import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Popover as MuiPopover } from '@mui/material'

interface Props {
  children: JSX.Element
  activateElement: (open: any, handleOpen: (event: any) => void) => JSX.Element
}

function Popover({ children, activateElement }: Props) {
  const [open, setOpen] = useState(null)

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget)
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
          },
        }}
      >
        {children}
      </MuiPopover>
    </>
  )
}

export default observer(Popover)
