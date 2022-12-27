import { generatePath, useNavigate } from 'react-router-dom'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import InfoIcon from '@mui/icons-material/Info'

import { getFullName } from 'shared/helpers'
import { Book, TableColumn } from 'shared/types'
import { GO_API_BOOK_IMAGES_URL, ROUTES } from 'shared/consts'
import { ImageAvatar } from 'shared/ui'

const ActionButtons = observer(({ book }: { book: Book }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const showMoreInfo = () => {
    navigate(generatePath(ROUTES.BOOK, { id: String(book.id) }))
  }

  return (
    <>
      <Tooltip title={t('actions.info') || 'info'} placement="top">
        <IconButton aria-label="info" size="small" onClick={() => showMoreInfo()}>
          <InfoIcon color="info" />
        </IconButton>
      </Tooltip>
    </>
  )
})

export const getColumns = (): TableColumn[] => [
  {
    key: 'name',
    title: i18next.t('book:name'),
    getValue: ({ name, id, quantity }: Book) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ImageAvatar
          src={`${GO_API_BOOK_IMAGES_URL}/${id}.jpg`}
          sx={{ width: 100, height: 120, mr: 2, borderRadius: '8px' }}
        />
        <Box>
          <Typography color="textPrimary">{name}</Typography>
          <Typography color="textSecondary" variant="subtitle1" sx={{ display: 'flex', gap: 1 }}>
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
    getValue: (row: Book) => (
      <Box
        sx={{
          backgroundColor: 'grey.800',
          width: 'fit-content',
          p: 1,
          borderRadius: 1,
          color: 'grey.300',
        }}
      >
        {row.authors.map((item) => getFullName(item.name, item.surname)).join(', ')}
      </Box>
    ),
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
