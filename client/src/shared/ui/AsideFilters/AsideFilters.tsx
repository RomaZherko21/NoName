import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Button, Drawer, Divider, IconButton, Typography, Grid } from '@mui/material'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import { getTime } from 'date-fns'

interface Props {
  config: {
    key: string
    Control: (arg: any) => JSX.Element
    placeholder: string
    type?: string
    options?: any
  }[]
  openFilter: boolean
  onCloseFilter: () => void
  setSearchParams: (pre: any) => void
  searchParams: any
}

const AsideFilters = ({
  openFilter,
  onCloseFilter,
  config,
  setSearchParams,
  searchParams,
}: Props) => {
  const { t } = useTranslation()

  const onClearAllFilters = () => {
    setSearchParams('')
  }

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
          {t('common.filters')}
        </Typography>
        <IconButton onClick={onCloseFilter}>
          <FilterListOffIcon />
        </IconButton>
      </Stack>

      <Divider />

      <Stack spacing={3} sx={{ p: 3, overflow: 'hidden' }}>
        <Grid container spacing={3}>
          {config.map((item) => (
            <Grid item key={item.key} sx={{ width: '100%' }}>
              {item.type === 'input' && (
                <item.Control
                  placeholder={item.placeholder}
                  value={searchParams.get(item.key) || ''}
                  onChange={(e: any) =>
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, e.target.value)
                      return searchParams
                    })
                  }
                />
              )}
              {item.type === 'select' && (
                <item.Control
                  label={item.placeholder}
                  options={item.options || {}}
                  value={searchParams.get(item.key) || ''}
                  onChange={(e: any) =>
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, e.target.value)
                      return searchParams
                    })
                  }
                />
              )}
              {item.type === 'date' && (
                <item.Control
                  label={item.placeholder}
                  value={Number(searchParams.get(item.key)) || null}
                  onChange={(e: number) =>
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, String(getTime(e)))
                      return searchParams
                    })
                  }
                />
              )}
              {item.type === 'check' && (
                <item.Control
                  label={item.placeholder}
                  checked={searchParams.get(item.key) === 'true' || false}
                  onChange={(e: any) =>
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, e.target.checked)
                      return searchParams
                    })
                  }
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
        <Button
          onClick={onClearAllFilters}
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          startIcon={<ClearAllIcon />}
        >
          {t('common:clearAll')}
        </Button>
      </Box>
    </Drawer>
  )
}

export default observer(AsideFilters)
