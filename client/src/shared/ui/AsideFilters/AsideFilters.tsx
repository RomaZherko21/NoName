import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Grid,
  Tooltip,
  Theme,
} from '@mui/material'
import { getTime } from 'date-fns'
import { BsFilterRight } from 'react-icons/bs'
import { MdOutlineClearAll } from 'react-icons/md'

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
        sx: { width: 280, border: 'none', overflow: 'hidden' },
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
        <Tooltip title={t('actions.close')} placement="bottom">
          <IconButton onClick={onCloseFilter}>
            <BsFilterRight />
          </IconButton>
        </Tooltip>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, e.target.value)
                      return searchParams
                    })
                  }
                  }
                />
              )}
              {item.type === 'select' && (
                <item.Control
                  label={item.placeholder}
                  options={item.options || {}}
                  value={searchParams.get(item.key) || ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, e.target.value)
                      return searchParams
                    })
                  }
                  }
                />
              )}
              {item.type === 'date' && (
                <item.Control
                  label={item.placeholder}
                  value={Number(searchParams.get(item.key)) || null}
                  onChange={(e: number) => {
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, String(getTime(e)))
                      return searchParams
                    })
                  }
                  }
                />
              )}
              {item.type === 'checkbox' && (
                <item.Control
                  label={item.placeholder}
                  checked={searchParams.get(item.key) === 'true' || false}
                  onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
                    setSearchParams((searchParams: URLSearchParams) => {
                      searchParams.set(item.key, e.target.checked)
                      return searchParams
                    })
                  }
                  }
                  sx={{ color: ({ palette }: Theme) => palette.text.secondary, ml: 1 }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Box
        sx={{
          p: 3,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onClearAllFilters}
          size="medium"
          type="submit"
          color="inherit"
          startIcon={<MdOutlineClearAll />}
        >
          {t('actions.clear')}
        </Button>
      </Box>
    </Drawer>
  )
}

export default observer(AsideFilters)
