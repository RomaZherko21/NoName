import { generatePath, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'

import { ImageAvatar } from 'shared/ui'
import { GO_API_BOOK_IMAGES_URL, ROUTES } from 'shared/consts'

import { AuthorModel } from '../../model'

const AuthorBooks = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (AuthorModel.id) {
      AuthorModel.fetchAuthorBooks(AuthorModel.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthorModel.id])

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography color="textSecondary">{t('book:authorsBooks')}:</Typography>
          <List>
            {AuthorModel.books.map((item) => (
              <ListItem
                button
                onClick={() => {
                  navigate(generatePath(ROUTES.BOOK, { id: String(item.id) }))
                }}
                key={item.id}
              >
                <ListItemAvatar>
                  <ImageAvatar src={`${GO_API_BOOK_IMAGES_URL}/${item.id}.jpg`} />
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

export default observer(AuthorBooks)
