import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import InfoIcon from '@mui/icons-material/Info'

import { getFullName, getInitials } from 'shared/helpers'
import { Book, TableColumn } from 'shared/types'
import { useNavigate } from 'react-router-dom'
import { GO_API_URL } from 'shared/consts'

const ActionButtons = observer(({ book }: { book: Book }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const showMoreInfo = () => {
    navigate(`/books/${book.id}`)
  }

  return (
    <>
      <Tooltip title={t('actions.info') || 'info'} placement="top">
        <IconButton aria-label="info" size="small" onClick={() => showMoreInfo()}>
          <InfoIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </>
  )
})

export const getColumns = (): TableColumn[] => [
  {
    key: 'name',
    title: i18next.t('book:bookName'),
    getValue: ({ name, id, quantity }: Book) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ width: 80, height: 100, mr: 2, borderRadius: '8px' }}
          src={`${GO_API_URL}/uploads/book/${id}.jpg`}
        />
        <Box>
          <Typography color="textPrimary">{name}</Typography>
          <Typography
            color="textSecondary"
            variant="subtitle1"
            sx={{ display: 'flex', gap: '4px' }}
          >
            {i18next.t('book:quantity')}
            <Typography color="secondary" variant="subtitle1">
              {quantity}
            </Typography>
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    key: 'authors',
    title: i18next.t('book:author'),
    getValue: (row: Book) =>
      row.authors.map((item) => getFullName(item.name, item.surname)).join(', '),
  },
  {
    key: 'genres',
    title: i18next.t('book:genre'),
    getValue: (row: Book) => row.genres.map((item) => item.name).join(', '),
  },
  {
    key: 'publisher',
    title: i18next.t('book:publisher'),
  },
  {
    key: 'year',
    title: i18next.t('book:year'),
  },
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: Book) => <ActionButtons book={row} />,
  },
]
