import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import InfoIcon from '@mui/icons-material/Info'

import { getInitials } from 'shared/helpers'
import { Book, TableColumn } from 'shared/types'
import { useNavigate } from 'react-router-dom'

const ActionButtons = observer(({ book }: { book: Book }) => {
  const { t } = useTranslation()
  let navigate = useNavigate()

  const showMoreInfo = () => {
    navigate(`/books/${book.id}`)
  }

  return (
    <>
      <Tooltip title={t('actions.info') || 'info'} placement="top">
        <IconButton aria-label="info" size="small" onClick={() => showMoreInfo()}>
          <InfoIcon color="secondary" fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  )
})

export const getColumns = (): TableColumn[] => [
  {
    key: 'name',
    title: i18next.t('book:bookName'),
    getValue: ({ name }: Book) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar sx={{ mr: 2 }}>{getInitials(name)}</Avatar>
        <Typography color="textPrimary" variant="body1">
          {name}
        </Typography>
      </Box>
    ),
  },
  {
    key: 'authors',
    title: i18next.t('book:author'),
  },
  {
    key: 'genres',
    title: i18next.t('book:genre'),
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
