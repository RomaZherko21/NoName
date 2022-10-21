import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import InfoIcon from '@mui/icons-material/Info'

import { getInitials } from 'shared/helpers'
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
    getValue: ({ name, id }: Book) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar
          sx={{ width: 50, height: 50, mr: 2 }}
          src={`${GO_API_URL}/uploads/book/${id}.jpg`}
        />
        <Typography color="textPrimary" variant="body1">
          {name}
        </Typography>
      </Box>
    ),
  },
  {
    key: 'authors',
    title: i18next.t('book:author'),
    getValue: (row: Book) => row.authors.map((item) => item.name),
  },
  {
    key: 'genres',
    title: i18next.t('book:genre'),
    getValue: (row: Book) => row.genres.map((item) => item.name),
  },
  {
    key: 'publisher',
    title: i18next.t('book:publisher'),
  },
  {
    key: 'quantity',
    title: i18next.t('book:quantity'),
  },
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: Book) => <ActionButtons book={row} />,
  },
]
