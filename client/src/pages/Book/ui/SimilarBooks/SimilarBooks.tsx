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
import ImageIcon from '@mui/icons-material/Image'
import InfoIcon from '@mui/icons-material/Info'

import { BookModel } from 'pages/Book/model'
import { Author } from 'shared/types'

const SimilarBooks = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

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
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(SimilarBooks)
