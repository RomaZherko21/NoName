import { observer } from 'mobx-react-lite'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

import { BookModel } from 'pages/Book/model'

const BookDescription = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Card>
      <CardHeader subheader={BookModel.description} title={BookModel.name} />
      <Divider />
      <CardContent>
        <Stack justifyContent="space-between" direction="row" spacing={8}>
          <List sx={{ alignSelf: 'flex-start' }}>
            <ListItem sx={{ height: 54 }}>
              <ListItemAvatar sx={{ minWidth: 30 }}>
                <LibraryBooksIcon fontSize="small" />
              </ListItemAvatar>
              <ListItemText secondary="Quantity" primary={BookModel.quantity} />
            </ListItem>

            <ListItem sx={{ height: 54 }}>
              <ListItemAvatar sx={{ minWidth: 30 }}>
                <FaceIcon fontSize="small" />
              </ListItemAvatar>
              <ListItemText primary={BookModel.subscriptionsCounter} secondary="Subscriptions" />
            </ListItem>
          </List>

          <div style={{ width: '90px', height: '90px' }}>
            <CircularProgressbarWithChildren
              value={BookModel.booksTakenPercentage}
              styles={buildStyles({
                pathColor: theme.palette.success.dark,
                trailColor: theme.palette.background.default,
              })}
            >
              <Typography color="primaryText" variant="body1">
                {`${BookModel.remainsCounter}`}
              </Typography>
              <Typography color="textSecondary" variant="caption">
                {t('book:booksLeft')}
              </Typography>
            </CircularProgressbarWithChildren>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default observer(BookDescription)
