import { observer } from 'mobx-react-lite'
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
import { useTranslation } from 'react-i18next'

interface Props {
  paginationModel: PaginationModel
}

const Pagination = ({ paginationModel }: Props) => {
  const { t } = useTranslation()

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <FormControl style={{ minWidth: '100px' }}>
        <InputLabel id="perPage">{t('common.amount')}</InputLabel>
        <Select
          labelId="perPage"
          id="perPage"
          value={String(paginationModel.perPage)}
          label={t('common.amount')}
          onChange={(event: SelectChangeEvent) => {
            // eslint-disable-next-line
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
          // eslint-disable-next-line
          paginationModel.page = page
        }}
      />
    </Stack>
  )
}

export default observer(Pagination)
