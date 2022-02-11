import { Alert, Snackbar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useRootStore } from 'stores/Root'

enum Severity {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

const Notification = ({
  message,
  open,
  severity,
}: {
  message: string
  open: boolean
  severity: keyof typeof Severity
}) => {
  console.log('FUCK')
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
    >
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default observer(Notification)
