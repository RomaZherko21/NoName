import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Paper, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'

import { InputFilter } from '../Filters'

interface Props {
  setFilters: (pre: any) => void
  filters: any
  handleOpenFilter: () => void
}

const AsideFiltersBar = ({ setFilters, filters, handleOpenFilter }: Props) => {
  const { t } = useTranslation()

  return (
    <Paper sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <InputFilter
        placeholder="Search email..."
        value={filters.email || ''}
        onChange={(e: any) => setFilters((pre: any) => ({ ...pre, email: e.target.value }))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: '200px' }}
        size="small"
      />
      <Button disableRipple color="info" endIcon={<FilterListIcon />} onClick={handleOpenFilter}>
        {t('common.filters')}
      </Button>
    </Paper>
  )
}

export default observer(AsideFiltersBar)
