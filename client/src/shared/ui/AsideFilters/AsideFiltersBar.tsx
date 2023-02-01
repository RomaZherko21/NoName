import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Paper, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'

import { Input } from '../NoForm'

interface Props {
  onChange: (e: any) => void
  handleOpenFilter: () => void
  placeholder: string
  value: string
}

const AsideFiltersBar = ({ value, onChange, handleOpenFilter, placeholder }: Props) => {
  const { t } = useTranslation()

  return (
    <Paper sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Input
        placeholder={t(placeholder)}
        value={value}
        onChange={onChange}
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
