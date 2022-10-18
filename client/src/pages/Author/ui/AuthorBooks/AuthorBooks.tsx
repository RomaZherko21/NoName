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

const AuthorBooks = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const showMoreInfo = () => {
    navigate(`/authors/5`)
  }

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography color="textSecondary">{t('book:authorsBooks')}:</Typography>
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

export default observer(AuthorBooks)
