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

const AuthorBooks = () => {
  const { t } = useTranslation()

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
