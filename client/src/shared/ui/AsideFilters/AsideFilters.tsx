import { observer } from 'mobx-react-lite'
import { Box, Stack, Button, Drawer, Divider, IconButton, Typography, Grid } from '@mui/material'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import ClearAllIcon from '@mui/icons-material/ClearAll'

interface Props {
  config: {
    key: string
    Control: (arg: any) => JSX.Element
    placeholder: string
  }[]
  openFilter: boolean
  onCloseFilter: () => void
  setFilters: (pre: any) => void
}

const AsideFilters = ({ openFilter, onCloseFilter, config, setFilters }: Props) => {
  return (
    <Drawer
      anchor="right"
      open={openFilter}
      onClose={onCloseFilter}
      PaperProps={{
        sx: { width: 280, border: 'none', overflow: 'hidden', pt: '60px' },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 2 }}
      >
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Filters
        </Typography>
        <IconButton onClick={onCloseFilter}>
          <FilterListOffIcon />
        </IconButton>
      </Stack>

      <Divider />

      <Stack spacing={3} sx={{ p: 3, overflow: 'hidden' }}>
        <Grid container spacing={3}>
          {config.map((item) => (
            <Grid item key={item.key}>
              <item.Control
                placeholder={item.placeholder}
                onChange={(e: any) => {
                  setFilters((pre: any) => ({ ...pre, [item.key]: e.target.value }))
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Drawer>
  )
}

export default observer(AsideFilters)
