import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Grid, InputAdornment, Paper, Box } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { FiSearch } from 'react-icons/fi'

import { Input, Select } from 'shared/ui'
import { UserFilters } from 'pages/Users/model'

interface Props {
  handleOpenFilter: () => void
  filters: UserFilters
  onChange: (e: any) => void
}

function TableHeaderActions({ handleOpenFilter, filters, onChange }: Props) {
  const { t } = useTranslation()
  const [sort, setSort] = useState('Last update (newest)')

  return (
    <Grid
      component={Paper}
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        gap: 5,
        borderRadius: '20px 20px 0 0',
      }}
    >
      <Input
        value={filters.email}
        onChange={onChange}
        size="small"
        placeholder={t('user:actions.searchEmail')}
        label=""
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{<FiSearch size="24px" />}</InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Select
          onChange={(event) => setSort(event.target.value)}
          value={sort}
          label="common.sortBy"
          options={[
            'Last update (newest)',
            'Last update (oldest)',
            'Total orders(highest)',
            'Total orders(lowest)',
          ]}
        />
        <Button onClick={handleOpenFilter} size="large" color="info" endIcon={<FilterListIcon />}>
          {t('common.filters')}
        </Button>
      </Box>
    </Grid>
  )
}

export default TableHeaderActions
