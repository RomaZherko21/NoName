import { Button, Stack } from '@mui/material'

import { useRootStore } from 'stores/Root'

interface Props {
  onClose: () => void
}

const ExitDialog = ({ onClose }: Props) => {
  const { authorization } = useRootStore()

  return (
    <Stack direction="row" spacing={2} sx={{ padding: '20px', width: '300px' }}>
      <Button
        onClick={() => {
          authorization.unauthorize()
          onClose()
        }}
        variant="contained"
        color="error"
        fullWidth
      >
        Exit
      </Button>
    </Stack>
  )
}

export default ExitDialog
