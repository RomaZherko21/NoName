import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

interface Props {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: Props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default observer(TabPanel)
