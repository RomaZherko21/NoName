import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { useEffect } from 'react'

import { AuthorModel } from '../../model'

const AuthorBooks = () => {
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
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
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
