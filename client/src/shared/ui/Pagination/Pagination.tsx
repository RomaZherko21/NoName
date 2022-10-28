import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination as MUiPagination,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import Stack from '@mui/material/Stack'

import PaginationModel from 'models/Pagination'

interface Props {
  paginationModel: PaginationModel
}

const Pagination = ({ paginationModel }: Props) => {
  const { t } = useTranslation()

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <FormControl style={{ minWidth: '100px' }}>
        <InputLabel id="perPage">{t('fields.amount')}</InputLabel>
        <Select
          labelId="perPage"
          id="perPage"
          value={String(paginationModel.perPage)}
          label={t('fields.amount')}
          onChange={(event: SelectChangeEvent) => {
            paginationModel.perPage = Number(event.target.value)
          }}
        >
          {paginationModel.perPageArr.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <MUiPagination
        count={paginationModel.pageCount}
        defaultPage={paginationModel.page}
        color="primary"
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          paginationModel.page = page
        }}
      />
    </Stack>
  )
}

export default observer(Pagination)
