import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import { BookModel } from 'pages/Book/model'
import { Author } from 'shared/types'
import { GO_API_AUTHOR_IMAGES_URL, GO_API_URL } from 'shared/consts'
import { ImageAvatar } from 'shared/ui'

const SimilarBooks = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (BookModel.authors.length) {
      BookModel.fetchAuthorBooks(BookModel.authors?.[0]?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BookModel.authors.length])

  const showMoreInfo = (id: number) => {
    navigate(`/authors/${id}`)
  }

  return (
    <Card>
      <CardContent>
        <Box>
          {BookModel.authors.map((author: Author) => (
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography color="textPrimary">{author.name}</Typography>
              <Tooltip title={t('book:actions.authorInfo') || 'info'} placement="top">
                <IconButton
                  aria-label="info"
                  size="small"
                  onClick={() => {
                    showMoreInfo(author.id)
                  }}
                >
                  <InfoIcon color="secondary" fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>
          ))}

          <Divider />
          <Typography color="textSecondary">{t('book:similarBooks')}:</Typography>
          <List>
            {BookModel.similarBooks.map((item) => (
              <ListItem button>
                <ListItemAvatar>
                  <ImageAvatar src={`${GO_API_AUTHOR_IMAGES_URL}/${item.id}.jpg`} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.year} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(SimilarBooks)
