import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Grid, InputAdornment, Paper, Box, TextField } from '@mui/material'
import { FiSearch } from 'react-icons/fi'
import { BsFilter } from 'react-icons/bs'

import { Select } from 'shared/ui'

interface Props {
  handleOpenFilter: () => void

  inputValue: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputPlaceholder: string

  selectValue: string
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void

  sortOptions: { [key: string]: string }
  isTablePart?: boolean
}

function AsideFiltersBar({
  handleOpenFilter,
  inputValue,
  onInputChange,
  inputPlaceholder: inputLabel,
  selectValue,
  onSelectChange,
  sortOptions,
  isTablePart = false,
}: Props) {
  const { t } = useTranslation()

  return (
    <Grid
      component={Paper}
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        gap: 1,
        borderRadius: isTablePart ? '20px 20px 0 0' : 1,
      }}
    >
      <TextField
        value={inputValue}
        onChange={onInputChange}
        fullWidth
        size="small"
        placeholder={t(inputLabel)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{<FiSearch size="16px" />}</InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Select
          value={selectValue}
          onChange={onSelectChange}
          label="actions.sortBy"
          options={sortOptions}
          sx={{ width: '160px' }}
        />
        <Button
          onClick={handleOpenFilter}
          sx={{ px: 1 }}
          size="small"
          color="info"
          endIcon={<BsFilter />}
        >
          {t('common.filters')}
        </Button>
      </Box>
    </Grid>
  )
}

export default observer(AsideFiltersBar)
