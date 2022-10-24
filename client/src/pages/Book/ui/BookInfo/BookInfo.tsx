import { observer } from 'mobx-react-lite'
import { Box, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import BadgeIcon from '@mui/icons-material/Badge'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

import { Spinner, UploadImage } from 'shared/ui'
import { BookModel } from 'pages/Book/model'

import { GO_API_URL } from 'shared/consts'

const BookInfo = () => {
  // const handleUploadClick = async (event: any) => {
  //   await user.uploadPhoto(event.target.files[0])
  // }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {BookModel.loading.has ? (
            <Spinner />
          ) : (
            <UploadImage
              handleUploadClick={() => {}}
              width={160}
              height={180}
              borderRadius="5px"
              imageUrl={`${GO_API_URL}/uploads/book/${BookModel.id}.jpg`}
            />
          )}

          <List sx={{ alignSelf: 'flex-start' }}>
            <ListItem button sx={{ height: 54 }}>
              <ListItemAvatar>
                <DriveFileRenameOutlineIcon fontSize="small" />
              </ListItemAvatar>
              <ListItemText primary={BookModel.name} secondary="Name" />
            </ListItem>

            <ListItem button sx={{ height: 54 }}>
              <ListItemAvatar>
                <BadgeIcon fontSize="small" />
              </ListItemAvatar>
              <ListItemText primary={BookModel.publisher} secondary="Publisher" />
            </ListItem>

            <ListItem button sx={{ height: 54 }}>
              <ListItemAvatar>
                <ImageIcon fontSize="small" />
              </ListItemAvatar>
              <ListItemText
                primary={BookModel.genres.map((item) => item.name).join(', ')}
                secondary="Genres"
              />
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(BookInfo)
